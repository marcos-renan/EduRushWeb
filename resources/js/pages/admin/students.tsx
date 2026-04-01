import { Form, Head, usePage } from '@inertiajs/react';
import { GraduationCap, ShieldCheck, UserRound } from 'lucide-react';

type StudentProfile = {
    grade_year?: number;
    level?: number;
    total_xp?: number;
    current_streak?: number;
    energy?: number;
};

type StudentUser = {
    id: number;
    name: string;
    username?: string | null;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
    student_profile?: StudentProfile | null;
};

type SharedProps = {
    flash?: {
        success?: string;
        error?: string;
    };
};

type Props = {
    students: StudentUser[];
};

export default function AdminStudents({ students }: Props) {
    const { flash } = usePage<SharedProps>().props;

    return (
        <>
            <Head title="Admin • Alunos" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">Gestão de usuários</p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">Alunos e perfis de acesso</h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Visualize contas cadastradas e altere o tipo de usuário entre aluno e administrador.
                    </p>
                    {flash?.success ? (
                        <p className="mt-4 rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-sm font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                            {flash.success}
                        </p>
                    ) : null}
                    {flash?.error ? (
                        <p className="mt-4 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-sm font-semibold text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]">
                            {flash.error}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-3">
                    {students.map((student) => (
                        <article
                            key={student.id}
                            className="rounded-3xl border border-[#BFE0FF] bg-white p-4 dark:border-[#263753] dark:bg-[#111C33]"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F2FF] text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                        {student.role === 'admin' ? (
                                            <ShieldCheck className="h-5 w-5" />
                                        ) : (
                                            <GraduationCap className="h-5 w-5" />
                                        )}
                                    </span>
                                    <div>
                                        <p className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {student.name}
                                        </p>
                                        <p className="text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                            @{student.username ?? 'sem-usuario'} • {student.email}
                                        </p>
                                        <p className="mt-1 text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                            Perfil atual: {student.role === 'admin' ? 'Administrador' : 'Aluno'}
                                        </p>
                                    </div>
                                </div>

                                <Form
                                    method="patch"
                                    action={`/admin/students/${student.id}/role`}
                                    className="flex items-center gap-2"
                                >
                                    <select
                                        name="role"
                                        defaultValue={student.role}
                                        className="h-10 rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-bold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                    >
                                        <option value="user">Aluno</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5"
                                    >
                                        Salvar
                                    </button>
                                </Form>
                            </div>

                            {student.student_profile ? (
                                <div className="mt-3 grid gap-2 sm:grid-cols-5">
                                    <MiniStat label="Ano" value={`${student.student_profile.grade_year ?? 1}º`} />
                                    <MiniStat label="Nível" value={`${student.student_profile.level ?? 1}`} />
                                    <MiniStat label="XP" value={`${student.student_profile.total_xp ?? 0}`} />
                                    <MiniStat label="Sequência" value={`${student.student_profile.current_streak ?? 0}`} />
                                    <MiniStat label="Energia" value={`${student.student_profile.energy ?? 0}`} />
                                </div>
                            ) : (
                                <div className="mt-3 rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-3 text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    <span className="inline-flex items-center gap-2">
                                        <UserRound className="h-4 w-4" />
                                        Este usuário não possui perfil de aluno.
                                    </span>
                                </div>
                            )}
                        </article>
                    ))}

                    {students.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-[#BFE0FF] bg-white px-4 py-8 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#111C33] dark:text-[#8EA1C7]">
                            Nenhum usuário encontrado.
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-[#D9E9FF] bg-[#F8FBFF] px-3 py-2 dark:border-[#263753] dark:bg-[#0B1428]">
            <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</p>
            <p className="mt-0.5 text-base font-black text-[#0F1A3B] dark:text-[#E7EEFF]">{value}</p>
        </div>
    );
}
