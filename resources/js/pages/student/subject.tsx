import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Lock } from 'lucide-react';

type LessonItem = {
    difficulty?: string | null;
};

type TrailItem = {
    title: string;
    slug: string;
    description: string;
    lessons_count: number;
    completed_lessons_count: number;
    is_locked: boolean;
    lessons: LessonItem[];
};

type Props = {
    subject: {
        name: string;
        slug: string;
    };
    trails: TrailItem[];
};

type Tier = 'easy' | 'medium' | 'hard';

function difficultyTier(trail: TrailItem): Tier {
    const raw = (trail.lessons ?? []).map((lesson) =>
        String(lesson.difficulty ?? '').toLowerCase(),
    );
    if (raw.some((item) => ['hard', 'advanced', 'dificil'].includes(item)))
        return 'hard';
    if (
        raw.some((item) => ['medium', 'intermediate', 'medio'].includes(item))
    )
        return 'medium';
    return 'easy';
}

function tierUi(tier: Tier) {
    if (tier === 'hard') {
        return {
            label: 'Difícil',
            border: 'border-[#F06A85]',
            bg: 'bg-[#FFF0F3] dark:bg-[#2A1720]',
            text: 'text-[#AA2343] dark:text-[#FFB6C3]',
        };
    }
    if (tier === 'medium') {
        return {
            label: 'Médio',
            border: 'border-[#FFBF3D]',
            bg: 'bg-[#FFF7E6] dark:bg-[#2D2415]',
            text: 'text-[#9A6200] dark:text-[#FFD999]',
        };
    }
    return {
        label: 'Fácil',
        border: 'border-[#21C489]',
        bg: 'bg-[#ECFAF3] dark:bg-[#13281F]',
        text: 'text-[#0A7A4F] dark:text-[#9BE8C8]',
    };
}

export default function StudentSubject({ subject, trails }: Props) {
    return (
        <>
            <Head title={subject.name} />

            <section className="space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href="/student/materias"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para matérias
                    </Link>
                    <h1 className="mt-3 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        {subject.name}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Trilhas por nível de dificuldade para o seu ano atual.
                    </p>
                </div>

                <div className="grid gap-4">
                    {trails.map((trail) => {
                        const percent = trail.lessons_count
                            ? Math.round(
                                  (trail.completed_lessons_count /
                                      trail.lessons_count) *
                                      100,
                              )
                            : 0;
                        const ui = tierUi(difficultyTier(trail));

                        const card = (
                            <article
                                className={`rounded-3xl border p-5 transition ${ui.border} ${ui.bg}`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span
                                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.08em] ${ui.border} ${ui.text}`}
                                    >
                                        {ui.label}
                                    </span>
                                    {trail.is_locked ? (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-[#BFCBE2] bg-white/70 px-3 py-1 text-xs font-bold text-[#5B6B93] dark:border-[#3A4A67] dark:bg-[#0B1428] dark:text-[#B4C3E3]">
                                            <Lock className="h-3.5 w-3.5" />
                                            Bloqueada
                                        </span>
                                    ) : null}
                                </div>

                                <h2 className="mt-3 text-xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                    {trail.title}
                                </h2>
                                <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                    {trail.description}
                                </p>
                                <p className="mt-3 text-xs font-semibold text-[#2F3E63] dark:text-[#B4C3E3]">
                                    {trail.completed_lessons_count}/{trail.lessons_count}{' '}
                                    lições concluídas
                                </p>
                                <div className="mt-2 h-2 w-full rounded-full bg-[#DFECFF] dark:bg-[#142645]">
                                    <div
                                        className="h-2 rounded-full bg-[#1565FF]"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </article>
                        );

                        if (trail.is_locked) {
                            return (
                                <div key={trail.slug} className="opacity-85">
                                    {card}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={trail.slug}
                                href={`/student/trilhas/${trail.slug}`}
                                className="block"
                            >
                                {card}
                            </Link>
                        );
                    })}
                </div>
            </section>
        </>
    );
}

