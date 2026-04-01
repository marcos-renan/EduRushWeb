import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpenCheck,
    Flame,
    Layers3,
    Sparkles,
    Target,
} from 'lucide-react';

type SubjectSummary = {
    name: string;
    slug: string;
    trails_count: number;
    lessons_count: number;
    completed_lessons_count: number;
    progress_percent: number;
};

type MissionItem = {
    external_id: string;
    title: string;
    description: string;
    mission_type: 'daily' | 'weekly';
    progress: number;
    target: number;
    progress_percent: number;
    reward_xp: number;
    is_completed: boolean;
};

type StudentProfile = {
    grade_year: number;
    level: number;
    total_xp: number;
    current_streak: number;
    energy: number;
    energy_regen_cap: number;
};

type Props = {
    subjects: SubjectSummary[];
    missions: MissionItem[];
    missionMeta: {
        completed_missions?: number;
        total_missions?: number;
    };
    studentProfile: StudentProfile | null;
    nextStudyTarget: {
        lesson_slug: string;
        trail_slug: string;
    } | null;
};

export default function StudentDashboard({
    subjects,
    missions,
    missionMeta,
    studentProfile,
    nextStudyTarget,
}: Props) {
    const { auth } = usePage<{
        auth: {
            user?: {
                name?: string;
            } | null;
        };
    }>().props;
    const firstName = String(auth.user?.name ?? 'Aluno')
        .trim()
        .split(' ')[0];

    const completedMissions = missionMeta.completed_missions ?? 0;
    const totalMissions = missionMeta.total_missions ?? missions.length;

    return (
        <>
            <Head title="Dashboard do Aluno" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 shadow-[0_12px_38px_rgba(21,101,255,0.12)] dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Jornada EduRush
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Bem-vindo, {firstName}.
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Continue de onde parou e mantenha seu ritmo diário de estudos no
                        ensino médio.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {nextStudyTarget?.lesson_slug ? (
                            <Link
                                href={`/student/licoes/${nextStudyTarget.lesson_slug}`}
                                className="inline-flex items-center gap-2 rounded-full bg-[#1565FF] px-5 py-2.5 text-sm font-black text-white shadow-[0_12px_26px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5"
                            >
                                Continuar lição
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        ) : null}
                        <Link
                            href="/student/materias"
                            className="inline-flex items-center gap-2 rounded-full border border-[#BFE0FF] bg-[#F4F8FF] px-5 py-2.5 text-sm font-black text-[#1565FF] transition hover:-translate-y-0.5 dark:border-[#2F4062] dark:bg-[#0B1428] dark:text-[#9CC0FF]"
                        >
                            Ver matérias
                            <Layers3 className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="Nível"
                        value={`Nv. ${studentProfile?.level ?? 1}`}
                        icon={<Sparkles className="h-4 w-4" />}
                    />
                    <StatCard
                        label="XP Total"
                        value={`${studentProfile?.total_xp ?? 0}`}
                        icon={<Target className="h-4 w-4" />}
                    />
                    <StatCard
                        label="Sequência"
                        value={`${studentProfile?.current_streak ?? 0}`}
                        icon={<Flame className="h-4 w-4" />}
                    />
                    <StatCard
                        label="Missões"
                        value={`${completedMissions}/${totalMissions}`}
                        icon={<BookOpenCheck className="h-4 w-4" />}
                    />
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            Suas matérias
                        </h2>
                        <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                            Organização por matéria para manter trilhas separadas por ano.
                        </p>

                        <div className="mt-4 space-y-3">
                            {subjects.slice(0, 5).map((subject) => (
                                <Link
                                    key={subject.slug}
                                    href={`/student/materias/${subject.slug}`}
                                    className="block rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-4 transition hover:border-[#8CC4FF] hover:shadow-sm dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-extrabold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {subject.name}
                                        </p>
                                        <span className="text-xs font-black text-[#1565FF] dark:text-[#9CC0FF]">
                                            {subject.progress_percent}%
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {subject.completed_lessons_count}/{subject.lessons_count}{' '}
                                        lições concluídas
                                    </p>
                                    <div className="mt-2 h-2 w-full rounded-full bg-[#DFECFF] dark:bg-[#142645]">
                                        <div
                                            className="h-2 rounded-full bg-[#1565FF]"
                                            style={{
                                                width: `${subject.progress_percent}%`,
                                            }}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            Missões ativas
                        </h2>
                        <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                            Complete desafios para subir de nível e ganhar mais energia.
                        </p>

                        <div className="mt-4 space-y-3">
                            {missions.slice(0, 4).map((mission) => (
                                <div
                                    key={mission.external_id}
                                    className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-4 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {mission.title}
                                        </p>
                                        <span className="text-xs font-black uppercase text-[#1565FF] dark:text-[#9CC0FF]">
                                            {mission.mission_type === 'daily'
                                                ? 'Diária'
                                                : 'Semanal'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {mission.description}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#2F3E63] dark:text-[#B4C3E3]">
                                        <span>
                                            {mission.progress}/{mission.target}
                                        </span>
                                        <span>{mission.progress_percent}%</span>
                                    </div>
                                    <div className="mt-1.5 h-2 w-full rounded-full bg-[#DFECFF] dark:bg-[#142645]">
                                        <div
                                            className="h-2 rounded-full bg-[#1565FF]"
                                            style={{
                                                width: `${mission.progress_percent}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}

                            {missions.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-6 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    Nenhuma missão ativa no momento.
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]">
            <div className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                {icon}
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </p>
            <p className="mt-1 text-2xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                {value}
            </p>
        </div>
    );
}
