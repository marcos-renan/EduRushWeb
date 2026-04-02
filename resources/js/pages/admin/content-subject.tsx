import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Layers3, Pencil, Plus, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Subject = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    color_hex: string;
    icon?: string | null;
    is_active: boolean;
};

type Trail = {
    id: number;
    title: string;
    slug: string;
    grade_year: number;
    position: number;
    description?: string | null;
    is_active: boolean;
    lessons_count: number;
};

type SharedProps = {
    flash?: {
        success?: string;
        error?: string;
    };
};

type Props = {
    subject: Subject;
    trails: Trail[];
};

export default function AdminContentSubject({ subject, trails }: Props) {
    const page = usePage<SharedProps>();

    const subjectForm = useForm({
        name: subject.name,
        slug: subject.slug,
        description: subject.description ?? '',
        color_hex: subject.color_hex ?? '#2563EB',
        icon: subject.icon ?? '',
        is_active: subject.is_active ? '1' : '0',
    });

    const trailForm = useForm({
        title: '',
        slug: '',
        grade_year: '1',
        position: '1',
        description: '',
        is_active: '1',
    });

    const deleteSubject = () => {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a matéria "${subject.name}"?`,
        );
        if (!confirmed) return;

        router.delete(`/admin/content/subjects/${subject.id}`);
    };

    const deleteTrail = (trail: Trail) => {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a trilha "${trail.title}"?`,
        );
        if (!confirmed) return;

        router.delete(`/admin/content/trails/${trail.id}`);
    };

    return (
        <>
            <Head title={`Admin • ${subject.name}`} />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href="/admin/content"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para matérias
                    </Link>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                {subject.icon ? `${subject.icon} ` : ''}
                                {subject.name}
                            </h1>
                            <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                Gerencie trilhas desta matéria sem formulários fixos
                                no topo.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#BFE0FF] bg-white px-4 text-sm font-black text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#111C33] dark:text-[#9CC0FF]">
                                        <Pencil className="h-4 w-4" />
                                        Editar matéria
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl rounded-2xl border-[#BFE0FF] bg-white dark:border-[#263753] dark:bg-[#111C33]">
                                    <DialogHeader>
                                        <DialogTitle className="text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            Editar matéria
                                        </DialogTitle>
                                        <DialogDescription>
                                            Atualize os dados da matéria selecionada.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form
                                        className="grid gap-3 md:grid-cols-2"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            subjectForm.patch(
                                                `/admin/content/subjects/${subject.id}`,
                                                { preserveScroll: true },
                                            );
                                        }}
                                    >
                                        <Field label="Nome">
                                            <input
                                                value={subjectForm.data.name}
                                                onChange={(event) =>
                                                    subjectForm.setData(
                                                        'name',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={subjectForm.errors.name} />
                                        </Field>
                                        <Field label="Slug">
                                            <input
                                                value={subjectForm.data.slug}
                                                onChange={(event) =>
                                                    subjectForm.setData(
                                                        'slug',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={subjectForm.errors.slug} />
                                        </Field>
                                        <Field label="Cor">
                                            <input
                                                value={subjectForm.data.color_hex}
                                                onChange={(event) =>
                                                    subjectForm.setData(
                                                        'color_hex',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText
                                                message={subjectForm.errors.color_hex}
                                            />
                                        </Field>
                                        <Field label="Ícone">
                                            <input
                                                value={subjectForm.data.icon}
                                                onChange={(event) =>
                                                    subjectForm.setData(
                                                        'icon',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={subjectForm.errors.icon} />
                                        </Field>
                                        <Field label="Descrição" className="md:col-span-2">
                                            <textarea
                                                value={subjectForm.data.description}
                                                onChange={(event) =>
                                                    subjectForm.setData(
                                                        'description',
                                                        event.target.value,
                                                    )
                                                }
                                                className={textareaClass}
                                                rows={3}
                                            />
                                            <ErrorText
                                                message={subjectForm.errors.description}
                                            />
                                        </Field>
                                        <div className="md:col-span-2 flex flex-wrap items-center gap-2">
                                            <button
                                                type="submit"
                                                disabled={subjectForm.processing}
                                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                                            >
                                                Salvar matéria
                                            </button>
                                            <button
                                                type="button"
                                                onClick={deleteSubject}
                                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-4 text-sm font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Excluir matéria
                                            </button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5">
                                        <Plus className="h-4 w-4" />
                                        Criar trilha
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl rounded-2xl border-[#BFE0FF] bg-white dark:border-[#263753] dark:bg-[#111C33]">
                                    <DialogHeader>
                                        <DialogTitle className="text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            Nova trilha
                                        </DialogTitle>
                                        <DialogDescription>
                                            Cadastre uma trilha vinculada a esta matéria.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form
                                        className="grid gap-3 md:grid-cols-2"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            trailForm.post(
                                                `/admin/content/subjects/${subject.id}/trails`,
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () =>
                                                        trailForm.reset(
                                                            'title',
                                                            'slug',
                                                            'description',
                                                        ),
                                                },
                                            );
                                        }}
                                    >
                                        <Field label="Título">
                                            <input
                                                value={trailForm.data.title}
                                                onChange={(event) =>
                                                    trailForm.setData(
                                                        'title',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                                placeholder="Ex: Funções quadráticas"
                                            />
                                            <ErrorText message={trailForm.errors.title} />
                                        </Field>
                                        <Field label="Slug (opcional)">
                                            <input
                                                value={trailForm.data.slug}
                                                onChange={(event) =>
                                                    trailForm.setData(
                                                        'slug',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={trailForm.errors.slug} />
                                        </Field>
                                        <Field label="Ano">
                                            <select
                                                value={trailForm.data.grade_year}
                                                onChange={(event) =>
                                                    trailForm.setData(
                                                        'grade_year',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="1">1º ano</option>
                                                <option value="2">2º ano</option>
                                                <option value="3">3º ano</option>
                                            </select>
                                            <ErrorText message={trailForm.errors.grade_year} />
                                        </Field>
                                        <Field label="Posição">
                                            <input
                                                value={trailForm.data.position}
                                                onChange={(event) =>
                                                    trailForm.setData(
                                                        'position',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={trailForm.errors.position} />
                                        </Field>
                                        <Field label="Descrição" className="md:col-span-2">
                                            <textarea
                                                value={trailForm.data.description}
                                                onChange={(event) =>
                                                    trailForm.setData(
                                                        'description',
                                                        event.target.value,
                                                    )
                                                }
                                                className={textareaClass}
                                                rows={3}
                                            />
                                            <ErrorText
                                                message={trailForm.errors.description}
                                            />
                                        </Field>
                                        <div className="md:col-span-2">
                                            <button
                                                type="submit"
                                                disabled={trailForm.processing}
                                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                                            >
                                                Criar trilha
                                            </button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

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
                            <Layers3 className="h-4 w-4" />
                        </span>
                        Trilhas da matéria
                    </h2>
                    <div className="mt-4 space-y-2">
                        {trails.map((trail) => (
                            <div
                                key={trail.id}
                                className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {trail.title}
                                        </p>
                                        <p className="text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                            {trail.grade_year}º ano • posição {trail.position}{' '}
                                            • {trail.lessons_count} lições
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/content/trails/${trail.id}`}
                                            className="inline-flex items-center gap-1 rounded-xl border border-[#BFE0FF] bg-white px-3 py-2 text-xs font-black text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#111C33] dark:text-[#9CC0FF]"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => deleteTrail(trail)}
                                            className="inline-flex items-center gap-1 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-xs font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {trails.length === 0 ? (
                            <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-8 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                Ainda não há trilhas para esta matéria.
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
