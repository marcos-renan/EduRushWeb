import { Head } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';

type BadgeItem = {
    name: string;
    icon?: string;
    color_hex?: string;
};

type LessonPerDay = {
    date: string;
    lessons_completed: number;
};

type RankedMember = {
    rank: number;
    is_me: boolean;
    user: {
        external_id: string;
        name: string;
        username: string;
        handle: string;
        profile_photo_url?: string | null;
    };
    stats: {
        grade_year: number;
        level: number;
        total_xp: number;
        current_streak: number;
        badges: BadgeItem[];
        lessons_per_day: LessonPerDay[];
    };
};

type Props = {
    ranking: RankedMember[];
    rankingMeta: {
        total_members?: number;
        total_friends?: number;
    };
};

const STREAK_ACTIVE_COLOR = '#ffb43f';

export default function StudentRanking({ ranking, rankingMeta }: Props) {
    const [selectedMember, setSelectedMember] = useState<RankedMember | null>(
        null,
    );

    const myRow = useMemo(
        () => ranking.find((member) => member.is_me) ?? null,
        [ranking],
    );

    return (
        <>
            <Head title="Ranking" />

            <section className="space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Competição saudável
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Ranking
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Toque em um perfil para ver sequência, lições por dia,
                        nível e badges.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                            Sua colocação
                        </p>
                        <p className="mt-1 text-3xl font-black text-[#1565FF]">
                            {myRow ? `#${myRow.rank}` : '#-'}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                            {myRow
                                ? `${myRow.stats.total_xp} XP acumulado`
                                : 'Adicione amigos para entrar no ranking'}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                            Membros
                        </p>
                        <p className="mt-1 text-3xl font-black text-[#1565FF]">
                            {rankingMeta.total_members ?? ranking.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                            Amigos no ranking
                        </p>
                        <p className="mt-1 text-3xl font-black text-[#1565FF]">
                            {rankingMeta.total_friends ?? Math.max(0, ranking.length - 1)}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    {ranking.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-5 text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                            Sem jogadores no ranking ainda.
                        </div>
                    ) : null}

                    {ranking.map((member) => (
                        <button
                            type="button"
                            key={`${member.user.external_id}-ranking`}
                            onClick={() => setSelectedMember(member)}
                            className="flex w-full items-center gap-3 rounded-2xl border border-[#BFE0FF] bg-white px-3 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm dark:border-[#263753] dark:bg-[#111C33]"
                        >
                            <span className="inline-flex w-9 justify-center text-sm font-black text-[#1565FF]">
                                #{member.rank}
                            </span>
                            <RankingAvatar member={member} />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                    {member.user.name}
                                    {member.is_me ? ' (você)' : ''}
                                </p>
                                <p className="truncate text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                    {member.user.handle} • Nv. {member.stats.level}
                                </p>
                            </div>
                            <span className="text-xs font-black text-[#1565FF]">
                                {member.stats.total_xp} XP
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {selectedMember ? (
                <RankingModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            ) : null}
        </>
    );
}

function RankingModal({
    member,
    onClose,
}: {
    member: RankedMember;
    onClose: () => void;
}) {
    const streakPoints = buildStreakGraphPoints(member.stats.current_streak);
    const dayInitials = member.stats.lessons_per_day.map((item) =>
        dayInitial(item.date),
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050C1C]/65 p-4">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Perfil no ranking
                    </p>
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#BFE0FF] text-[#5B6B93] dark:border-[#263753] dark:text-[#B4C3E3]"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <RankingAvatar member={member} />
                    <div>
                        <p className="text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            {member.user.name}
                        </p>
                        <p className="text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                            {member.user.handle}
                        </p>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#F6FAFF] p-3 dark:bg-[#0B1428]">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                            Nível
                        </p>
                        <p className="mt-1 text-2xl font-black text-[#1565FF]">
                            {member.stats.level}
                        </p>
                    </div>
                    <div className="rounded-2xl bg-[#F6FAFF] p-3 dark:bg-[#0B1428]">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                            Sequência
                        </p>
                        <p className="mt-1 text-2xl font-black text-[#1565FF]">
                            {member.stats.current_streak}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Gráfico de sequência
                    </p>
                    <div className="mt-2 flex items-center">
                        {streakPoints.map((active, index) => (
                            <div
                                key={`streak-${member.user.external_id}-${index}`}
                                className="flex flex-1 items-center"
                            >
                                <div
                                    className="flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-black"
                                    style={{
                                        backgroundColor: active
                                            ? STREAK_ACTIVE_COLOR
                                            : 'transparent',
                                        borderColor: active
                                            ? STREAK_ACTIVE_COLOR
                                            : '#7B8CAF',
                                        color: active ? '#FFFFFF' : '#7B8CAF',
                                    }}
                                >
                                    {dayInitials[index] ?? '-'}
                                </div>
                                {index < streakPoints.length - 1 ? (
                                    <div
                                        className="mx-1 h-[2px] flex-1 rounded-full"
                                        style={{
                                            backgroundColor:
                                                streakPoints[index] &&
                                                streakPoints[index + 1]
                                                    ? STREAK_ACTIVE_COLOR
                                                    : '#7B8CAF',
                                        }}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Lições por dia
                    </p>
                    <div className="mt-2 rounded-2xl bg-[#F6FAFF] p-3 dark:bg-[#0B1428]">
                        <LessonsLineChart data={member.stats.lessons_per_day} />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Badges
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {member.stats.badges.length > 0 ? (
                            member.stats.badges.map((badge, index) => (
                                <span
                                    key={`${badge.name}-${index}`}
                                    className="inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.08em]"
                                    style={{
                                        borderColor: badge.color_hex ?? '#1565FF',
                                        color: badge.color_hex ?? '#1565FF',
                                    }}
                                >
                                    {badge.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                Sem badges desbloqueadas ainda.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RankingAvatar({ member }: { member: RankedMember }) {
    const photo = member.user.profile_photo_url ?? null;
    const initials = String(member.user.name ?? 'U').trim().charAt(0).toUpperCase();

    if (photo) {
        return (
            <img
                src={photo}
                alt={member.user.name}
                className="h-10 w-10 rounded-full border border-[#BFE0FF] object-cover"
            />
        );
    }

    return (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#BFE0FF] bg-[#E8F2FF] text-sm font-black text-[#1565FF] dark:border-[#2E4062] dark:bg-[#142645] dark:text-[#9CC0FF]">
            {initials}
        </span>
    );
}

function buildStreakGraphPoints(streak: number, points = 7): boolean[] {
    const activeCount = Math.max(0, Math.min(streak, points));
    const threshold = points - activeCount;

    return Array.from({ length: points }, (_, index) => index >= threshold);
}

function dayInitial(dateValue: string): string {
    const parsed = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return '-';
    const label = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
        .format(parsed)
        .replace('.', '');

    return label.charAt(0).toUpperCase();
}

function LessonsLineChart({ data }: { data: LessonPerDay[] }) {
    const safeData = data.length ? data : [{ date: '', lessons_completed: 0 }];
    const width = 520;
    const height = 170;
    const chartPadding = { top: 12, right: 12, bottom: 30, left: 28 };
    const chartWidth = width - chartPadding.left - chartPadding.right;
    const chartHeight = height - chartPadding.top - chartPadding.bottom;
    const maxValue = Math.max(
        1,
        ...safeData.map((item) => item.lessons_completed),
    );

    const xForIndex = (index: number) =>
        chartPadding.left +
        (safeData.length <= 1 ? 0 : (index / (safeData.length - 1)) * chartWidth);
    const yForValue = (value: number) =>
        chartPadding.top + chartHeight - (value / maxValue) * chartHeight;

    const polylinePoints = safeData
        .map((item, index) => `${xForIndex(index)},${yForValue(item.lessons_completed)}`)
        .join(' ');
    const yAxisTicks = [0, maxValue];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[170px] w-full">
            {yAxisTicks.map((tick) => {
                const y = yForValue(tick);
                return (
                    <g key={`tick-${tick}`}>
                        <line
                            x1={chartPadding.left}
                            y1={y}
                            x2={width - chartPadding.right}
                            y2={y}
                            stroke="#8CC4FF"
                            strokeOpacity="0.4"
                            strokeWidth="1"
                        />
                        <text
                            x={6}
                            y={y + 4}
                            fill="#7B8CAF"
                            fontSize="11"
                            fontWeight="700"
                        >
                            {tick}
                        </text>
                    </g>
                );
            })}

            <polyline
                fill="none"
                stroke="#1565FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
            />

            {safeData.map((item, index) => {
                const x = xForIndex(index);
                const y = yForValue(item.lessons_completed);
                const day = dayInitial(item.date);

                return (
                    <g key={`point-${item.date}-${index}`}>
                        <circle cx={x} cy={y} r="4" fill="#1565FF" />
                        <text
                            x={x}
                            y={height - 10}
                            textAnchor="middle"
                            fill="#7B8CAF"
                            fontSize="11"
                            fontWeight="700"
                        >
                            {day}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

