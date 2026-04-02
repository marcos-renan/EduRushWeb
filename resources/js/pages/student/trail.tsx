import { Head, Link } from '@inertiajs/react';
import { Lock, Play, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const NODE_SIZE = 62;
const ROAD_STROKE = 5;

type TrailLesson = {
    external_id?: string;
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

type NodePosition = {
    x: number;
    y: number;
};

function difficultyLabel(difficulty?: string | null) {
    const value = String(difficulty ?? '').toLowerCase().trim();
    if (['advanced', 'hard', 'dificil'].includes(value)) return 'Difícil';
    if (['intermediate', 'medium', 'medio'].includes(value)) return 'Médio';
    return 'Fácil';
}

function buildNodePositions(total: number, width: number): NodePosition[] {
    if (total <= 0) return [];

    const horizontalPadding = 56;
    const centerX = width / 2;
    const amplitude = Math.max(
        36,
        Math.min(92, (width - horizontalPadding * 2) / 2),
    );
    const verticalSpacing = 116;
    const topOffset = 62;

    return Array.from({ length: total }, (_, index) => {
        const progress = total === 1 ? 0 : index / (total - 1);
        const wave =
            Math.sin(progress * Math.PI * 2.6) * 0.6 +
            (index % 2 === 0 ? -0.55 : 0.55);
        const x = Math.max(
            horizontalPadding,
            Math.min(width - horizontalPadding, centerX + wave * amplitude),
        );
        const y = topOffset + index * verticalSpacing;

        return { x, y };
    });
}

export default function StudentTrail({ trail }: Props) {
    const [selectedLesson, setSelectedLesson] = useState<TrailLesson | null>(
        null,
    );
    const roadmapRef = useRef<HTMLDivElement | null>(null);
    const [roadmapWidth, setRoadmapWidth] = useState(0);

    useEffect(() => {
        const element = roadmapRef.current;
        if (!element) return;

        const updateWidth = () => {
            const width = Math.round(element.clientWidth);
            if (width > 0) {
                setRoadmapWidth((previous) =>
                    previous === width ? previous : width,
                );
            }
        };

        updateWidth();

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(updateWidth);
            observer.observe(element);
            return () => observer.disconnect();
        }

        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const nodes = useMemo(
        () =>
            trail.lessons.map((lesson, index) => {
                const side = index % 2 === 0 ? 'left' : 'right';
                const status = lesson.is_locked
                    ? 'locked'
                    : lesson.is_completed
                      ? 'completed'
                      : 'available';

                return {
                    lesson,
                    side,
                    status,
                    index,
                    key: lesson.external_id || lesson.slug || `lesson-${index}`,
                };
            }),
        [trail.lessons],
    );
    const positions = useMemo(
        () => buildNodePositions(nodes.length, Math.max(roadmapWidth, 320)),
        [nodes.length, roadmapWidth],
    );
    const roadmapHeight = useMemo(
        () => Math.max(nodes.length * 116 + 110, 260),
        [nodes.length],
    );
    const focusNodeKey = useMemo(
        () =>
            nodes.find((node) => node.status === 'available')?.key ??
            nodes.find((node) => node.status !== 'locked')?.key ??
            null,
        [nodes],
    );
    const selectedLessonDifficulty = selectedLesson
        ? difficultyLabel(selectedLesson.difficulty)
        : 'Fácil';

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
                    <div
                        ref={roadmapRef}
                        className="relative mx-auto w-full max-w-4xl overflow-visible rounded-[20px] bg-[#F4F8FF] dark:bg-[#111C33]"
                        style={{ height: `${roadmapHeight}px` }}
                    >
                        {nodes.slice(0, -1).map((node, index) => {
                            const current = positions[index];
                            const next = positions[index + 1];
                            if (!current || !next) return null;

                            const dx = next.x - current.x;
                            const dy = next.y - current.y;
                            const length = Math.hypot(dx, dy);
                            const angle = Math.atan2(dy, dx);
                            const isSegmentProgressed =
                                node.status === 'completed';

                            return (
                                <div
                                    key={`road-segment-${node.key}`}
                                    className={cn(
                                        'absolute rounded-full',
                                        isSegmentProgressed
                                            ? 'bg-[#1DBC80] dark:bg-[#1E9E6A]'
                                            : 'bg-[#A9D3FF] dark:bg-[#365173]',
                                    )}
                                    style={{
                                        left: `${current.x}px`,
                                        top: `${current.y}px`,
                                        width: `${length}px`,
                                        height: `${ROAD_STROKE}px`,
                                        transform: `translateY(-${ROAD_STROKE / 2}px) rotate(${angle}rad)`,
                                        transformOrigin: 'left center',
                                    }}
                                />
                            );
                        })}

                        {nodes.map(({ lesson, status, index, key }) => {
                            const point = positions[index];
                            if (!point) return null;
                            const highlightPulse =
                                key === focusNodeKey && status !== 'locked';
                            const Icon =
                                status === 'locked'
                                    ? Lock
                                    : status === 'completed'
                                      ? null
                                      : Play;

                            return (
                                <div
                                    key={key}
                                    className="absolute"
                                    style={{
                                        left: `${point.x - NODE_SIZE / 2}px`,
                                        top: `${point.y - NODE_SIZE / 2}px`,
                                    }}
                                >
                                    {highlightPulse ? (
                                        <span className="pointer-events-none absolute -inset-[2px] rounded-full border-2 border-[#1565FF] opacity-40 animate-ping dark:border-[#2E66CC]" />
                                    ) : null}

                                    <span
                                        className={cn(
                                            'pointer-events-none absolute left-[1px] top-[5px] h-[60px] w-[60px] rounded-full',
                                            status === 'completed' &&
                                                'bg-[#108A5D] dark:bg-[#116243]',
                                            status === 'locked' &&
                                                'bg-[#8291B2] dark:bg-[#39465E]',
                                            status === 'available' &&
                                                'bg-[#0F4BC9] dark:bg-[#264C95]',
                                        )}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setSelectedLesson(lesson)}
                                        className={cn(
                                            'relative inline-flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 transition hover:scale-105 active:translate-y-[4px] active:scale-95',
                                            'shadow-[0_4px_10px_rgba(0,0,0,0.2)]',
                                            status === 'completed' &&
                                                'border-[#1DBC80] bg-[#1DBC80] dark:border-[#1E9E6A] dark:bg-[#1E9E6A]',
                                            status === 'locked' &&
                                                'border-[#AAB6D3] bg-[#AAB6D3] dark:border-[#536280] dark:bg-[#536280]',
                                            status === 'available' &&
                                                'border-[#1565FF] bg-[#1565FF] dark:border-[#2E66CC] dark:bg-[#2E66CC]',
                                        )}
                                    >
                                        {status === 'completed' ? (
                                            <span className="text-lg font-black text-white">
                                                ✓
                                            </span>
                                        ) : Icon ? (
                                            <Icon className="h-5 w-5 text-white" />
                                        ) : null}
                                    </button>
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
                            <span
                                className={cn(
                                    'rounded-full px-3 py-1',
                                    !selectedLesson.is_locked &&
                                        !selectedLesson.is_completed
                                        ? 'bg-[#E8FFF4] text-[#108A5D] dark:bg-[#12392B] dark:text-[#72E0B5]'
                                        : selectedLesson.is_completed
                                          ? 'bg-[#FFF8E1] text-[#C79100] dark:bg-[#3B3318] dark:text-[#F6D57A]'
                                        : 'bg-[#EEF2F8] text-[#5B6B93] dark:bg-[#2A354D] dark:text-[#A7B7D8]',
                                )}
                            >
                                {selectedLesson.is_completed
                                    ? 'Concluída'
                                    : selectedLesson.is_locked
                                      ? 'Bloqueada'
                                      : 'Disponível'}
                            </span>
                            <span
                                className={cn(
                                    'rounded-full px-3 py-1',
                                    selectedLessonDifficulty === 'Fácil' &&
                                        'bg-[#E8FFF4] text-[#108A5D] dark:bg-[#12392B] dark:text-[#72E0B5]',
                                    selectedLessonDifficulty === 'Médio' &&
                                        'bg-[#FFF8E1] text-[#C79100] dark:bg-[#3B3318] dark:text-[#F6D57A]',
                                    selectedLessonDifficulty === 'Difícil' &&
                                        'bg-[#FFECEC] text-[#C23D3D] dark:bg-[#3B1E25] dark:text-[#FFA3A3]',
                                )}
                            >
                                Dificuldade: {selectedLessonDifficulty}
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
