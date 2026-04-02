import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { BookOpenCheck, Pencil, Plus, Trash2 } from 'lucide-react';

type Subject = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    color_hex: string;
    icon?: string | null;
    is_active: boolean;
    trails_count: number;
};

type SharedProps = {
    flash?: {
        success?: string;
        error?: string;
    };
};

type Props = {
    subjects: Subject[];
};

export default function AdminContentSubjects({ subjects }: Props) {
    const page = usePage<SharedProps>();
    const createForm = useForm({
        name: '',
        slug: '',
        description: '',
        color_hex: '#2563EB',
        icon: '',
        is_active: '1',
    });

    const removeSubject = (subject: Subject) => {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a matéria "${subject.name}"? Isso também removerá as trilhas e lições vinculadas.`,
        );

        if (!confirmed) return;

        router.delete(`/admin/content/subjects/${subject.id}`);
    };

    return (
        <>
            <Head title="Admin • Matérias" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Conteúdo
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Matérias
                    </h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Gerencie suas matérias. O botão editar abre as trilhas da matéria.
                    </p>
                    {page.props.flash?.success ? (
                        <p className="mt-4 rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-sm font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                            {page.props.flash.success}
                        </p>
                    ) : null}
                    {page.props.flash?.error ? (
                        <p className="mt-4 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-sm font-semibold text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]">
                            {page.props.flash.error}
                        </p>
                    ) : null}
                </div>

                <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                    <h2 className="inline-flex items-center gap-2 text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        <span className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                            <Plus className="h-4 w-4" />
                        </span>
                        Criar nova matéria
                    </h2>

                    <form
                        className="mt-4 grid gap-3 md:grid-cols-2"
                        onSubmit={(event) => {
                            event.preventDefault();
                            createForm.post('/admin/content/subjects', {
                                preserveScroll: true,
                                onSuccess: () =>
                                    createForm.reset(
                                        'name',
                                        'slug',
                                        'description',
                                        'icon',
                                    ),
                            });
                        }}
                    >
                        <Field label="Nome">
                            <input
                                value={createForm.data.name}
                                onChange={(event) =>
                                    createForm.setData('name', event.target.value)
                                }
                                className={inputClass}
                                placeholder="Ex: Matemática"
                            />
                            <ErrorText message={createForm.errors.name} />
                        </Field>

                        <Field label="Slug (opcional)">
                            <input
                                value={createForm.data.slug}
                                onChange={(event) =>
                                    createForm.setData('slug', event.target.value)
                                }
                                className={inputClass}
                                placeholder="matematica"
                            />
                            <ErrorText message={createForm.errors.slug} />
                        </Field>

                        <Field label="Cor">
                            <input
                                value={createForm.data.color_hex}
                                onChange={(event) =>
                                    createForm.setData('color_hex', event.target.value)
                                }
                                className={inputClass}
                                placeholder="#2563EB"
                            />
                            <ErrorText message={createForm.errors.color_hex} />
                        </Field>

                        <Field label="Ícone (opcional)">
                            <input
                                value={createForm.data.icon}
                                onChange={(event) =>
                                    createForm.setData('icon', event.target.value)
                                }
                                className={inputClass}
                                placeholder="📘"
                            />
                            <ErrorText message={createForm.errors.icon} />
                        </Field>

                        <Field label="Descrição" className="md:col-span-2">
                            <textarea
                                value={createForm.data.description}
                                onChange={(event) =>
                                    createForm.setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                className={textareaClass}
                                rows={3}
                                placeholder="Descrição curta da matéria..."
                            />
                            <ErrorText message={createForm.errors.description} />
                        </Field>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={createForm.processing}
                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                            >
                                {createForm.processing
                                    ? 'Criando...'
                                    : 'Criar matéria'}
                            </button>
                        </div>
                    </form>
                </article>

                <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                    <h2 className="inline-flex items-center gap-2 text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        <span className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                            <BookOpenCheck className="h-4 w-4" />
                        </span>
                        Matérias cadastradas
                    </h2>

                    <div className="mt-4 space-y-2">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {subject.icon ? `${subject.icon} ` : ''}
                                            {subject.name}
                                        </p>
                                        <p className="text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                            {subject.trails_count} trilhas • slug {subject.slug}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/content/subjects/${subject.id}`}
                                            className="inline-flex items-center gap-1 rounded-xl border border-[#BFE0FF] bg-white px-3 py-2 text-xs font-black text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#111C33] dark:text-[#9CC0FF]"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => removeSubject(subject)}
                                            className="inline-flex items-center gap-1 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-xs font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {subjects.length === 0 ? (
                            <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-8 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                Nenhuma matéria cadastrada ainda.
                            </p>
                        ) : null}
                    </div>
                </article>
            </section>
        </>
    );
}

function Field({
    label,
    className = '',
    children,
}: {
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </span>
            {children}
        </label>
    );
}

function ErrorText({ message }: { message?: string }) {
    if (!message) return null;

    return (
        <span className="mt-1 block text-xs font-semibold text-[#AA2343]">
            {message}
        </span>
    );
}

const inputClass =
    'h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]';

const textareaClass =
    'w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 py-2 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]';
