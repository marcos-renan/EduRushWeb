import { Head, Link } from '@inertiajs/react';
import { Lock, Play, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type TrailLesson = {
    title: string;
    slug: string;
    objective: string;
    position: number;
    xp_reward: number;
    is_completed: boolean;
    is_locked: boolean;
    difficulty?: string | null;
};

type Trail = {
    title: string;
    slug: string;
    description: string;
    subject: {
        name: string;
        slug: string;
    };
    lessons: TrailLesson[];
};

type Props = {
    trail: Trail;
};

function difficultyLabel(difficulty?: string | null) {
    const value = String(difficulty ?? '').toLowerCase().trim();
    if (['advanced', 'hard', 'dificil'].includes(value)) return 'Difícil';
    if (['intermediate', 'medium', 'medio'].includes(value)) return 'Médio';
    return 'Fácil';
}

export default function StudentTrail({ trail }: Props) {
    const [selectedLesson, setSelectedLesson] = useState<TrailLesson | null>(
        null,
    );
    const rows = useMemo(
        () =>
            trail.lessons.map((lesson, index) => {
                const side = index % 2 === 0 ? 'left' : 'right';
                const isProgressed = lesson.is_completed;
                return { lesson, side, isProgressed, index };
            }),
        [trail.lessons],
    );

    return (
        <>
            <Head title={trail.title} />

            <section className="space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href={`/student/materias/${trail.subject.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
                    >
                        Voltar para {trail.subject.name}
                    </Link>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        {trail.title}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        {trail.description}
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]">
                    <div className="mx-auto w-full max-w-4xl py-3">
                        {rows.map(({ lesson, side, isProgressed, index }) => {
                            const status = lesson.is_locked
                                ? 'locked'
                                : lesson.is_completed
                                  ? 'completed'
                                  : 'available';

                            return (
                                <div
                                    key={lesson.slug}
                                    className={cn(
                                        'relative flex',
                                        side === 'left'
                                            ? 'justify-start'
                                            : 'justify-end',
                                        index < rows.length - 1 && 'pb-16',
                                    )}
                                >
                                    <div className="relative w-72 text-center sm:w-80">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedLesson(lesson)
                                            }
                                            className="group inline-flex flex-col items-center"
                                        >
                                            <span
                                                className={cn(
                                                    'relative inline-flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-[0_8px_18px_rgba(5,16,44,0.28)] transition group-hover:scale-105',
                                                    status === 'completed' &&
                                                        'border-[#1E9E6A] bg-[#1DBC80]',
                                                    status === 'locked' &&
                                                        'border-[#7B8CAF] bg-[#AAB6D3]',
                                                    status === 'available' &&
                                                        'border-[#0F4BC9] bg-[#1565FF]',
                                                )}
                                            >
                                                {status === 'locked' ? (
                                                    <Lock className="h-5 w-5 text-white" />
                                                ) : status === 'completed' ? (
                                                    <span className="text-lg font-black text-white">
                                                        ✓
                                                    </span>
                                                ) : (
                                                    <Play className="ml-0.5 h-5 w-5 text-white" />
                                                )}
                                            </span>

                                            <span className="mt-2 block max-w-[210px] text-center text-xs font-bold text-[#2F3E63] dark:text-[#B4C3E3]">
                                                {lesson.position}. {lesson.title}
                                            </span>
                                        </button>

                                        {index < rows.length - 1 ? (
                                            <span
                                                className={cn(
                                                    'pointer-events-none absolute left-1/2 top-16 h-16 w-1 -translate-x-1/2 rounded-full',
                                                    isProgressed
                                                        ? 'bg-[#1DBC80]'
                                                        : 'bg-[#8CC4FF]/70 dark:bg-[#8CC4FF]/30',
                                                )}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {selectedLesson ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050C1C]/65 p-4">
                    <div className="w-full max-w-lg rounded-3xl border border-[#BFE0FF] bg-white p-5 shadow-2xl dark:border-[#263753] dark:bg-[#111C33]">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]">
                                Lição selecionada
                            </p>
                            <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#BFE0FF] text-[#5B6B93] dark:border-[#263753] dark:text-[#B4C3E3]"
                                onClick={() => setSelectedLesson(null)}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <h2 className="text-xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            {selectedLesson.position}. {selectedLesson.title}
                        </h2>
                        <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                            {selectedLesson.objective}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                            <span className="rounded-full bg-[#E8F2FF] px-3 py-1 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                {selectedLesson.is_completed
                                    ? 'Concluída'
                                    : selectedLesson.is_locked
                                      ? 'Bloqueada'
                                      : 'Disponível'}
                            </span>
                            <span className="rounded-full bg-[#E8F2FF] px-3 py-1 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                Dificuldade: {difficultyLabel(selectedLesson.difficulty)}
                            </span>
                            <span className="rounded-full bg-[#E8F2FF] px-3 py-1 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                +{selectedLesson.xp_reward} XP
                            </span>
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button
                                type="button"
                                className="flex-1 rounded-xl border border-[#BFE0FF] bg-[#F8FBFF] px-4 py-2.5 text-sm font-bold text-[#2F3E63] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#B4C3E3]"
                                onClick={() => setSelectedLesson(null)}
                            >
                                Fechar
                            </button>

                            {selectedLesson.is_locked ? (
                                <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D8DDE7] bg-[#EFF2F8] px-4 py-2.5 text-sm font-bold text-[#5B6B93] dark:border-[#2F4062] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    <Lock className="h-4 w-4" />
                                    Bloqueada
                                </div>
                            ) : (
                                <Link
                                    href={`/student/licoes/${selectedLesson.slug}`}
                                    className="flex-1 rounded-xl bg-[#1565FF] px-4 py-2.5 text-center text-sm font-black text-white shadow-[0_10px_20px_rgba(21,101,255,0.35)]"
                                >
                                    Começar
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
