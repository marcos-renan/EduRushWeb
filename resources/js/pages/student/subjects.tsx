import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

type SubjectSummary = {
    name: string;
    slug: string;
    trails_count: number;
    lessons_count: number;
    completed_lessons_count: number;
    progress_percent: number;
};

type Props = {
    subjects: SubjectSummary[];
};

export default function StudentSubjects({ subjects }: Props) {
    return (
        <>
            <Head title="Matérias" />

            <section className="space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Organização de estudos
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Matérias disponíveis
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Selecione uma matéria para explorar trilhas e iniciar as
                        lições do seu ano.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {subjects.map((subject) => (
                        <Link
                            key={subject.slug}
                            href={`/student/materias/${subject.slug}`}
                            className="group rounded-3xl border border-[#BFE0FF] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(21,101,255,0.15)] dark:border-[#263753] dark:bg-[#111C33]"
                        >
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1565FF]">
                                Matéria
                            </p>
                            <h2 className="mt-2 text-xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                {subject.name}
                            </h2>
                            <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                {subject.trails_count} trilhas • {subject.lessons_count}{' '}
                                lições
                            </p>
                            <p className="mt-1 text-xs font-semibold text-[#2F3E63] dark:text-[#B4C3E3]">
                                {subject.completed_lessons_count}/
                                {subject.lessons_count} concluídas
                            </p>
                            <div className="mt-3 h-2 w-full rounded-full bg-[#DFECFF] dark:bg-[#142645]">
                                <div
                                    className="h-2 rounded-full bg-[#1565FF]"
                                    style={{
                                        width: `${subject.progress_percent}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#1565FF] dark:text-[#9CC0FF]">
                                Acessar matéria
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}

                    {subjects.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-[#BFE0FF] bg-white/70 p-8 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#111C33]/70 dark:text-[#8EA1C7]">
                            Nenhuma matéria ativa no momento.
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
}

