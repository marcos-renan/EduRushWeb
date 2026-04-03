import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import confettiAnimation from '@/assets/animations/confetti.json';
import errorAnimation from '@/assets/animations/error.json';
import successAnimation from '@/assets/animations/success.json';
import trophyAnimation from '@/assets/animations/trophy.json';
import SafeLottie from '@/components/safe-lottie';

type Lesson = {
    title: string;
    slug: string;
    objective: string;
};

type Question = {
    external_id: string;
    position: number;
    prompt: string;
    options: string[];
    correct_option: number;
    explanation?: string | null;
};

type TrailLesson = {
    slug: string;
};

type Trail = {
    slug: string;
    lessons: TrailLesson[];
};

type MissionHighlight = {
    title: string;
    reward_xp: number;
    mission_type?: string;
};

type BadgeHighlight = {
    name: string;
    icon?: string;
    color_hex?: string;
};

type LessonSubmitResult = {
    data: {
        quiz: {
            total_questions: number;
            correct_answers: number;
            score: number;
        };
        progress: {
            passed: boolean;
            already_completed: boolean;
            earned_xp: number;
            energy_delta?: number;
        };
        student_profile?: {
            energy?: number;
            level?: number;
            total_xp?: number;
            current_streak?: number;
        };
        completed_missions?: MissionHighlight[];
        unlocked_badges?: BadgeHighlight[];
    };
};

type Props = {
    lesson: Lesson;
    questions: Question[];
    trails: Trail[];
};

export default function StudentLesson({ lesson, questions, trails }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answersByQuestion, setAnswersByQuestion] = useState<
        Record<string, number>
    >({});
    const [checkedByQuestion, setCheckedByQuestion] = useState<
        Record<string, boolean>
    >({});
    const [isCorrectByQuestion, setIsCorrectByQuestion] = useState<
        Record<string, boolean>
    >({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [result, setResult] = useState<LessonSubmitResult['data'] | null>(
        null,
    );
    const [showConfetti, setShowConfetti] = useState(false);

    const correctAudioRef = useRef<HTMLAudioElement | null>(null);
    const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
    const winAudioRef = useRef<HTMLAudioElement | null>(null);
    const playedWinRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        correctAudioRef.current = new Audio('/sounds/correct.mpeg');
        wrongAudioRef.current = new Audio('/sounds/wrong.mpeg');
        winAudioRef.current = new Audio('/sounds/win.mpeg');

        return () => {
            [correctAudioRef.current, wrongAudioRef.current, winAudioRef.current]
                .filter((audio): audio is HTMLAudioElement => !!audio)
                .forEach((audio) => {
                    audio.pause();
                    audio.currentTime = 0;
                });
        };
    }, []);

    const playAudio = (audio: HTMLAudioElement | null, volume = 1) => {
        if (!audio) return;
        audio.volume = volume;
        audio.currentTime = 0;
        void audio.play().catch(() => undefined);
    };

    const currentQuestion = questions[currentIndex];
    const selectedOption = currentQuestion
        ? answersByQuestion[currentQuestion.external_id]
        : undefined;
    const isCurrentChecked = currentQuestion
        ? !!checkedByQuestion[currentQuestion.external_id]
        : false;
    const isCurrentCorrect = currentQuestion
        ? !!isCorrectByQuestion[currentQuestion.external_id]
        : false;
    const isLastQuestion =
        questions.length > 0 && currentIndex === questions.length - 1;
    const isPrimaryDisabled =
        selectedOption === undefined || isSubmitting;

    const nextProgressTarget = useMemo(() => {
        const flat = trails ?? [];
        let currentTrailIndex = -1;
        let currentLessonIndex = -1;

        for (let trailIndex = 0; trailIndex < flat.length; trailIndex += 1) {
            const lessonIndex = flat[trailIndex].lessons.findIndex(
                (item) => item.slug === lesson.slug,
            );
            if (lessonIndex >= 0) {
                currentTrailIndex = trailIndex;
                currentLessonIndex = lessonIndex;
                break;
            }
        }

        if (currentTrailIndex < 0 || currentLessonIndex < 0) return null;

        const nextLesson =
            flat[currentTrailIndex].lessons[currentLessonIndex + 1];

        if (nextLesson?.slug) {
            return {
                href: `/student/licoes/${nextLesson.slug}`,
                label: 'Próxima lição',
            };
        }

        const nextTrail = flat[currentTrailIndex + 1];
        if (nextTrail?.slug) {
            return {
                href: `/student/trilhas/${nextTrail.slug}`,
                label: 'Ir para próxima trilha',
            };
        }

        return {
            href: '/student/dashboard',
            label: 'Voltar',
        };
    }, [lesson.slug, trails]);

    const submitAttempt = async () => {
        if (!questions.length) return;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const answers = questions
                .filter(
                    (question) =>
                        answersByQuestion[question.external_id] !== undefined,
                )
                .map((question) => ({
                    question_external_id: question.external_id,
                    selected_option: answersByQuestion[question.external_id],
                }));

            const csrfToken =
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content') ?? '';

            const response = await fetch(
                `/student/licoes/${lesson.slug}/submit`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({ answers }),
                },
            );

            const payload = (await response.json()) as LessonSubmitResult & {
                message?: string;
            };

            if (!response.ok) {
                throw new Error(
                    payload?.message ??
                        'Não foi possível concluir a lição agora.',
                );
            }

            setResult(payload.data);
            const newEnergy = payload?.data?.student_profile?.energy;
            if (typeof window !== 'undefined' && typeof newEnergy === 'number') {
                window.dispatchEvent(
                    new CustomEvent('edurush:energy-changed', {
                        detail: {
                            energy: newEnergy,
                            delta: payload?.data?.progress?.energy_delta ?? 0,
                        },
                    }),
                );
            }
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : 'Erro inesperado ao enviar respostas.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetAttempt = () => {
        playedWinRef.current = false;
        setCurrentIndex(0);
        setAnswersByQuestion({});
        setCheckedByQuestion({});
        setIsCorrectByQuestion({});
        setSubmitError(null);
        setResult(null);
    };

    const handlePrimaryAction = () => {
        if (!currentQuestion || selectedOption === undefined) return;

        if (!isCurrentChecked) {
            const isCorrect = selectedOption === currentQuestion.correct_option;
            setCheckedByQuestion((state) => ({
                ...state,
                [currentQuestion.external_id]: true,
            }));
            setIsCorrectByQuestion((state) => ({
                ...state,
                [currentQuestion.external_id]: isCorrect,
            }));

            playAudio(isCorrect ? correctAudioRef.current : wrongAudioRef.current, isCorrect ? 0.9 : 1);
            return;
        }

        if (isLastQuestion) {
            void submitAttempt();
            return;
        }

        setCurrentIndex((index) => index + 1);
    };

    const hasPassed = !!result && result.progress.passed;
    const hasFailed = !!result && !result.progress.passed;
    const showRetryButton = !!result && result.quiz.score < 100;

    useEffect(() => {
        if (!hasPassed || !result) {
            playedWinRef.current = false;
            setShowConfetti(false);
            return;
        }

        if (playedWinRef.current) return;
        playedWinRef.current = true;
        playAudio(winAudioRef.current, 0.95);

        const timeoutId = window.setTimeout(() => {
            setShowConfetti(true);
        }, 450);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [hasPassed, result]);

    return (
        <>
            <Head title={lesson.title} />

            {hasPassed && showConfetti ? (
                <div className="pointer-events-none fixed inset-0 z-40">
                    <SafeLottie
                        animationData={confettiAnimation}
                        loop={false}
                        autoplay
                        className="h-full w-full"
                    />
                </div>
            ) : null}

            <section className="relative mx-auto w-full max-w-3xl space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href="/student/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF] transition hover:opacity-80"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Sair da lição
                    </Link>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        {lesson.title}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        {lesson.objective}
                    </p>
                </div>

                {result ? (
                    hasPassed ? (
                        <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 text-center dark:border-[#263753] dark:bg-[#111C33]">
                            <div className="mx-auto h-44 w-44">
                                <SafeLottie
                                    animationData={trophyAnimation}
                                    loop={false}
                                    autoplay
                                    className="h-full w-full"
                                />
                            </div>

                            <p className="text-3xl font-black text-[#FFB43F]">
                                Parabéns você passou!
                            </p>
                            <p className="mt-2 text-sm font-bold text-[#5B6B93] dark:text-white">
                                Excelente desempenho nesta lição.
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#5B6B93] dark:text-white">
                                Você acertou {result.quiz.correct_answers} de{' '}
                                {result.quiz.total_questions} questões.
                            </p>
                            <p className="text-sm font-semibold text-[#5B6B93] dark:text-white">
                                Pontuação: {result.quiz.score}%
                            </p>

                            <p className="mt-2 text-sm font-black text-[#1E9E6A]">
                                {result.progress.already_completed
                                    ? 'Esta lição já tinha sido concluída antes.'
                                    : `+${result.progress.earned_xp} XP ganhos.`}
                            </p>

                            {(result.completed_missions ?? []).length > 0 ? (
                                <div className="mt-4 rounded-2xl border border-[#BFE0FF] bg-[#F6FAFF] p-3 text-left dark:border-[#263753] dark:bg-[#0B1428]">
                                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#1565FF]">
                                        Missões concluídas
                                    </p>
                                    <div className="mt-2 space-y-1">
                                        {(result.completed_missions ?? []).map(
                                            (mission, index) => (
                                                <p
                                                    key={`${mission.title}-${index}`}
                                                    className="text-sm font-semibold text-[#2F3E63] dark:text-[#B4C3E3]"
                                                >
                                                    {mission.title} (+
                                                    {mission.reward_xp} XP)
                                                </p>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {(result.unlocked_badges ?? []).length > 0 ? (
                                <div className="mt-3 rounded-2xl border border-[#BFE0FF] bg-[#F6FAFF] p-3 text-left dark:border-[#263753] dark:bg-[#0B1428]">
                                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#1565FF]">
                                        Badges desbloqueados
                                    </p>
                                    <div className="mt-2 space-y-1">
                                        {(result.unlocked_badges ?? []).map(
                                            (badge, index) => (
                                                <p
                                                    key={`${badge.name}-${index}`}
                                                    className="text-sm font-semibold text-[#2F3E63] dark:text-[#B4C3E3]"
                                                >
                                                    {badge.name}
                                                </p>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {showRetryButton ? (
                                    <button
                                        type="button"
                                        onClick={resetAttempt}
                                        className="rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-bold text-[#2F3E63] transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#EAF3FF] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3] dark:hover:border-[#375786] dark:hover:bg-[#16233D]"
                                    >
                                        Refazer
                                    </button>
                                ) : (
                                    <Link
                                        href="/student/dashboard"
                                        className="rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-bold text-[#2F3E63] transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#EAF3FF] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3] dark:hover:border-[#375786] dark:hover:bg-[#16233D]"
                                    >
                                        Voltar
                                    </Link>
                                )}

                                {nextProgressTarget ? (
                                    <Link
                                        href={nextProgressTarget.href}
                                        className="rounded-xl bg-[#1565FF] px-4 py-2 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110"
                                    >
                                        {nextProgressTarget.label}
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    ) : hasFailed ? (
                        <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 text-center dark:border-[#263753] dark:bg-[#111C33]">
                            <img
                                src="/images/defeat.png"
                                alt="Derrota"
                                className="mx-auto h-44 w-44 object-contain"
                            />
                            <p className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                Infelizmente não foi dessa vez!
                            </p>
                            <p className="mt-2 text-sm font-bold text-[#5B6B93] dark:text-[#8EA1C7]">
                                Mas você pode tentar mais uma vez!
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={resetAttempt}
                                    className="rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-bold text-[#2F3E63] transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#EAF3FF] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3] dark:hover:border-[#375786] dark:hover:bg-[#16233D]"
                                >
                                    Tentar de novo
                                </button>
                                <Link
                                    href="/student/dashboard"
                                    className="rounded-xl bg-[#1565FF] px-4 py-2 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110"
                                >
                                    Voltar
                                </Link>
                            </div>
                        </div>
                    ) : null
                ) : (
                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                        {questions.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-5 text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                Esta lição não possui questões no momento.
                            </div>
                        ) : (
                            <>
                                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]">
                                    Questão {currentIndex + 1} de{' '}
                                    {questions.length}
                                </p>
                                <h2 className="mt-2 text-xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                    {currentQuestion.prompt}
                                </h2>

                                <div className="mt-4 space-y-2">
                                    {currentQuestion.options.map(
                                        (option, index) => {
                                            const selected =
                                                selectedOption === index;
                                            const isCorrectOption =
                                                isCurrentChecked &&
                                                index ===
                                                    currentQuestion.correct_option;
                                            const isWrongSelected =
                                                isCurrentChecked &&
                                                selected &&
                                                !isCorrectOption;

                                            return (
                                                <button
                                                    key={`${currentQuestion.external_id}-${index}`}
                                                    type="button"
                                                    className={cn(
                                                        'w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition',
                                                        !isCurrentChecked &&
                                                            'cursor-pointer hover:-translate-y-0.5 hover:shadow-sm',
                                                        isCorrectOption
                                                            ? 'border-[#1E9E6A] bg-[#E9FBF3] text-[#0A7A4F] dark:bg-[#143426] dark:text-[#9BE8C8]'
                                                            : isWrongSelected
                                                              ? 'border-[#F06A85] bg-[#FFF0F3] text-[#AA2343] dark:bg-[#331720] dark:text-[#FFB6C3]'
                                                            : selected
                                                                ? cn(
                                                                      'border-[#1565FF] bg-[#E8F2FF] text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]',
                                                                      !isCurrentChecked &&
                                                                          'hover:border-[#0F57E6] hover:bg-[#DDEEFF] dark:hover:border-[#4E78C2] dark:hover:bg-[#1A2D4E]',
                                                                  )
                                                                : 'border-[#D9E9FF] bg-[#F8FBFF] text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]',
                                                        !isCurrentChecked &&
                                                            !selected &&
                                                            'hover:border-[#93C5FF] hover:bg-[#EAF3FF] dark:hover:border-[#375786] dark:hover:bg-[#16233D]',
                                                    )}
                                                    onClick={() => {
                                                        if (
                                                            isCurrentChecked ||
                                                            isSubmitting
                                                        )
                                                            return;

                                                        setAnswersByQuestion(
                                                            (state) => ({
                                                                ...state,
                                                                [currentQuestion.external_id]:
                                                                    index,
                                                            }),
                                                        );
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        },
                                    )}
                                </div>

                                {isCurrentChecked ? (
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.08em]">
                                        {isCurrentCorrect ? (
                                            <>
                                                <CheckCircle2 className="h-4 w-4 text-[#1E9E6A]" />
                                                <span className="text-[#1E9E6A]">
                                                    Correta
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-4 w-4 text-[#D92D4E]" />
                                                <span className="text-[#D92D4E]">
                                                    Incorreta
                                                </span>
                                            </>
                                        )}
                                    </div>
                                ) : null}

                                {submitError ? (
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-xs font-semibold text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]">
                                        <AlertTriangle className="h-4 w-4" />
                                        {submitError}
                                    </div>
                                ) : null}

                                <button
                                    type="button"
                                    disabled={isPrimaryDisabled}
                                    onClick={handlePrimaryAction}
                                    className={cn(
                                        'mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-black text-white transition active:translate-y-0 active:scale-[0.99]',
                                        isPrimaryDisabled
                                            ? 'cursor-not-allowed opacity-55'
                                            : 'cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:ring-2 hover:ring-white/40',
                                        isCurrentChecked
                                            ? isCurrentCorrect
                                                ? cn(
                                                      'bg-[#2F855A] shadow-[0_10px_22px_rgba(47,133,90,0.35)]',
                                                      !isPrimaryDisabled &&
                                                          'hover:bg-[#27764F] hover:brightness-110 hover:shadow-[0_16px_30px_rgba(47,133,90,0.5)]',
                                                  )
                                                : cn(
                                                      'bg-[#DE5A5A] shadow-[0_10px_22px_rgba(222,90,90,0.35)]',
                                                      !isPrimaryDisabled &&
                                                          'hover:bg-[#CE4E4E] hover:brightness-110 hover:shadow-[0_16px_30px_rgba(222,90,90,0.5)]',
                                                  )
                                            : cn(
                                                  'bg-[#1565FF] shadow-[0_10px_22px_rgba(21,101,255,0.35)]',
                                                  !isPrimaryDisabled &&
                                                      'hover:bg-[#0F57E6] hover:brightness-110 hover:shadow-[0_16px_30px_rgba(21,101,255,0.5)]',
                                              ),
                                    )}
                                >
                                    {isSubmitting ? (
                                        'Enviando...'
                                    ) : isCurrentChecked ? (
                                        <span className="inline-flex items-center gap-2">
                                            {isCurrentCorrect &&
                                            successAnimation ? (
                                                <SafeLottie
                                                    key={`${currentQuestion.external_id}-success`}
                                                    animationData={successAnimation}
                                                    loop={false}
                                                    autoplay
                                                    className="h-9 w-9 scale-[1.9]"
                                                />
                                            ) : null}
                                            {!isCurrentCorrect &&
                                            errorAnimation ? (
                                                <SafeLottie
                                                    key={`${currentQuestion.external_id}-error`}
                                                    animationData={errorAnimation}
                                                    loop={false}
                                                    autoplay
                                                    className="h-9 w-9 scale-[2.2]"
                                                />
                                            ) : null}
                                            <span>Continuar</span>
                                        </span>
                                    ) : (
                                        'Verificar'
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}
