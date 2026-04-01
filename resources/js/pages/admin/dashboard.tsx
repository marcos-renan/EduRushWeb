import { Head, Link } from '@inertiajs/react';
import {
    BadgeCheck,
    BookOpenCheck,
    Boxes,
    BrainCircuit,
    CircleHelp,
    GraduationCap,
    Route,
    Sparkles,
    Target,
} from 'lucide-react';

type Stats = {
    subjects: number;
    trails: number;
    lessons: number;
    questions: number;
    students: number;
    missions: number;
    badges: number;
};

type RecentTrail = {
    id: number;
    title: string;
    slug: string;
    grade_year: number;
    position: number;
    is_active: boolean;
    subject?: {
        name: string;
    };
};

type RecentLesson = {
    id: number;
    title: string;
    slug: string;
    difficulty: string;
    xp_reward: number;
    is_active: boolean;
    trail?: {
        title: string;
        subject?: {
            name: string;
        };
    };
};

type Props = {
    stats: Stats;
    recentTrails: RecentTrail[];
    recentLessons: RecentLesson[];
};

const quickActions = [
    { label: 'Gerenciar conteúdo', href: '/admin/content', icon: Boxes },
    { label: 'Gerenciar missões', href: '/admin/missions', icon: Target },
    { label: 'Gerenciar badges', href: '/admin/badges', icon: BadgeCheck },
    { label: 'Gerenciar alunos', href: '/admin/students', icon: GraduationCap },
];

export default function AdminDashboard({ stats, recentTrails, recentLessons }: Props) {
    return (
        <>
            <Head title="Painel Admin" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 shadow-[0_12px_38px_rgba(21,101,255,0.12)] dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Administração EduRush
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Painel de controle
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Acompanhe o crescimento da plataforma e gerencie matérias, trilhas,
                        lições, missões e badges em um único lugar.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {quickActions.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="inline-flex items-center gap-2 rounded-2xl border border-[#BFE0FF] bg-[#F4F8FF] px-4 py-3 text-sm font-black text-[#1565FF] transition hover:-translate-y-0.5 dark:border-[#2B3F62] dark:bg-[#0B1428] dark:text-[#9CC0FF]"
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Matérias" value={stats.subjects} icon={<BookOpenCheck className="h-4 w-4" />} />
                    <StatCard label="Trilhas" value={stats.trails} icon={<Route className="h-4 w-4" />} />
                    <StatCard label="Lições" value={stats.lessons} icon={<BrainCircuit className="h-4 w-4" />} />
                    <StatCard label="Questões" value={stats.questions} icon={<CircleHelp className="h-4 w-4" />} />
                    <StatCard label="Alunos" value={stats.students} icon={<GraduationCap className="h-4 w-4" />} />
                    <StatCard label="Missões" value={stats.missions} icon={<Target className="h-4 w-4" />} />
                    <StatCard label="Badges" value={stats.badges} icon={<BadgeCheck className="h-4 w-4" />} />
                    <StatCard label="Ações rápidas" value={quickActions.length} icon={<Sparkles className="h-4 w-4" />} />
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            Trilhas recentes
                        </h2>
                        <div className="mt-4 space-y-2">
                            {recentTrails.map((trail) => (
                                <div
                                    key={trail.id}
                                    className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {trail.title}
                                        </p>
                                        <span className="text-xs font-black text-[#1565FF] dark:text-[#9CC0FF]">
                                            {trail.is_active ? 'Ativa' : 'Inativa'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {trail.subject?.name ?? 'Sem matéria'} • {trail.grade_year}º ano •
                                        posição {trail.position}
                                    </p>
                                </div>
                            ))}
                            {recentTrails.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-6 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    Ainda não existem trilhas cadastradas.
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            Lições recentes
                        </h2>
                        <div className="mt-4 space-y-2">
                            {recentLessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {lesson.title}
                                        </p>
                                        <span className="text-xs font-black text-[#1565FF] dark:text-[#9CC0FF]">
                                            +{lesson.xp_reward} XP
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {lesson.trail?.subject?.name ?? 'Sem matéria'} •{' '}
                                        {lesson.trail?.title ?? 'Sem trilha'} • dificuldade {lesson.difficulty}
                                    </p>
                                </div>
                            ))}
                            {recentLessons.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-6 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    Ainda não existem lições cadastradas.
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
    return (
        <article className="rounded-2xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]">
            <div className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                {icon}
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </p>
            <p className="mt-1 text-2xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">{value}</p>
        </article>
    );
}
