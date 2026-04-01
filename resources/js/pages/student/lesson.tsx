import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

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
        };
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
    const isLastQuestion = questions.length > 0 && currentIndex === questions.length - 1;

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

    return (
        <>
            <Head title={lesson.title} />

            <section className="mx-auto w-full max-w-3xl space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href="/student/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
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
                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                        {hasPassed ? (
                            <>
                                <p className="text-2xl font-black text-[#1565FF]">
                                    Parabéns, você passou.
                                </p>
                                <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Você acertou {result.quiz.correct_answers} de{' '}
                                    {result.quiz.total_questions} questões (
                                    {result.quiz.score}%).
                                </p>
                            </>
                        ) : hasFailed ? (
                            <>
                                <p className="text-2xl font-black text-[#D92D4E]">
                                    Infelizmente não foi dessa vez.
                                </p>
                                <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Você acertou {result.quiz.correct_answers} de{' '}
                                    {result.quiz.total_questions} questões (
                                    {result.quiz.score}%).
                                </p>
                            </>
                        ) : null}

                        <div className="mt-5 flex flex-wrap gap-2">
                            {showRetryButton ? (
                                <button
                                    type="button"
                                    onClick={resetAttempt}
                                    className="rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-bold text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]"
                                >
                                    Refazer
                                </button>
                            ) : (
                                <Link
                                    href="/student/dashboard"
                                    className="rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2 text-sm font-bold text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]"
                                >
                                    Voltar
                                </Link>
                            )}

                            {hasPassed && nextProgressTarget ? (
                                <Link
                                    href={nextProgressTarget.href}
                                    className="rounded-xl bg-[#1565FF] px-4 py-2 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)]"
                                >
                                    {nextProgressTarget.label}
                                </Link>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                        {questions.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-5 text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                Esta lição não possui questões no momento.
                            </div>
                        ) : (
                            <>
                                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]">
                                    Questão {currentIndex + 1} de {questions.length}
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
                                                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                                                        isCorrectOption
                                                            ? 'border-[#1E9E6A] bg-[#E9FBF3] text-[#0A7A4F] dark:bg-[#143426] dark:text-[#9BE8C8]'
                                                            : isWrongSelected
                                                              ? 'border-[#F06A85] bg-[#FFF0F3] text-[#AA2343] dark:bg-[#331720] dark:text-[#FFB6C3]'
                                                              : selected
                                                                ? 'border-[#1565FF] bg-[#E8F2FF] text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]'
                                                                : 'border-[#D9E9FF] bg-[#F8FBFF] text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]'
                                                    }`}
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
                                    disabled={
                                        selectedOption === undefined ||
                                        isSubmitting
                                    }
                                    onClick={handlePrimaryAction}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] disabled:cursor-not-allowed disabled:opacity-55"
                                >
                                    {isSubmitting
                                        ? 'Enviando...'
                                        : isCurrentChecked
                                          ? 'Continuar'
                                          : 'Verificar'}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}

