import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpenCheck, Pencil, Plus, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Trail = {
    id: number;
    subject_id: number;
    title: string;
    slug: string;
    grade_year: number;
    position: number;
    description?: string | null;
    is_active: boolean;
    subject: {
        id: number;
        name: string;
        slug: string;
    };
};

type Lesson = {
    id: number;
    trail_id: number;
    title: string;
    slug: string;
    position: number;
    objective?: string | null;
    xp_reward: number;
    difficulty: string;
    is_active: boolean;
    prerequisite_lesson_id?: number | null;
    questions_count: number;
};

type LessonOption = {
    id: number;
    title: string;
};

type SharedProps = {
    flash?: {
        success?: string;
        error?: string;
    };
};

type Props = {
    trail: Trail;
    lessons: Lesson[];
    lessonOptions: LessonOption[];
};

export default function AdminContentTrail({
    trail,
    lessons,
    lessonOptions,
}: Props) {
    const page = usePage<SharedProps>();

    const trailForm = useForm({
        title: trail.title,
        slug: trail.slug,
        grade_year: String(trail.grade_year),
        position: String(trail.position),
        description: trail.description ?? '',
        is_active: trail.is_active ? '1' : '0',
    });

    const lessonForm = useForm({
        title: '',
        slug: '',
        position: String(lessons.length + 1),
        objective: '',
        content: '',
        xp_reward: '20',
        difficulty: 'basic',
        prerequisite_lesson_id: '',
        is_active: '1',
    });

    const removeTrail = () => {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a trilha "${trail.title}"?`,
        );
        if (!confirmed) return;

        router.delete(`/admin/content/trails/${trail.id}`);
    };

    const removeLesson = (lesson: Lesson) => {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a lição "${lesson.title}"?`,
        );
        if (!confirmed) return;

        router.delete(`/admin/content/lessons/${lesson.id}`);
    };

    return (
        <>
            <Head title={`Admin • ${trail.title}`} />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href={`/admin/content/subjects/${trail.subject_id}`}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para {trail.subject.name}
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                {trail.title}
                            </h1>
                            <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                Gerencie as lições da trilha usando modais de
                                edição/criação.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#BFE0FF] bg-white px-4 text-sm font-black text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#111C33] dark:text-[#9CC0FF]">
                                        <Pencil className="h-4 w-4" />
                                        Editar trilha
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl rounded-2xl border-[#BFE0FF] bg-white dark:border-[#263753] dark:bg-[#111C33]">
                                    <DialogHeader>
                                        <DialogTitle className="text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            Editar trilha
                                        </DialogTitle>
                                        <DialogDescription>
                                            Atualize os dados da trilha selecionada.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form
                                        className="grid gap-3 md:grid-cols-2"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            trailForm.patch(
                                                `/admin/content/trails/${trail.id}`,
                                                { preserveScroll: true },
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
                                            />
                                            <ErrorText message={trailForm.errors.title} />
                                        </Field>
                                        <Field label="Slug">
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
                                            <ErrorText
                                                message={trailForm.errors.grade_year}
                                            />
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
                                            <ErrorText
                                                message={trailForm.errors.position}
                                            />
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
                                        <div className="md:col-span-2 flex flex-wrap items-center gap-2">
                                            <button
                                                type="submit"
                                                disabled={trailForm.processing}
                                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                                            >
                                                Salvar trilha
                                            </button>
                                            <button
                                                type="button"
                                                onClick={removeTrail}
                                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-4 text-sm font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Excluir trilha
                                            </button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5">
                                        <Plus className="h-4 w-4" />
                                        Criar lição
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl rounded-2xl border-[#BFE0FF] bg-white dark:border-[#263753] dark:bg-[#111C33]">
                                    <DialogHeader>
                                        <DialogTitle className="text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            Nova lição
                                        </DialogTitle>
                                        <DialogDescription>
                                            Cadastre uma lição vinculada a esta trilha.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form
                                        className="grid gap-3 md:grid-cols-2"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            lessonForm.post(
                                                `/admin/content/trails/${trail.id}/lessons`,
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () =>
                                                        lessonForm.reset(
                                                            'title',
                                                            'slug',
                                                            'objective',
                                                            'content',
                                                        ),
                                                },
                                            );
                                        }}
                                    >
                                        <Field label="Título">
                                            <input
                                                value={lessonForm.data.title}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'title',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={lessonForm.errors.title} />
                                        </Field>
                                        <Field label="Slug (opcional)">
                                            <input
                                                value={lessonForm.data.slug}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'slug',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={lessonForm.errors.slug} />
                                        </Field>
                                        <Field label="Posição">
                                            <input
                                                value={lessonForm.data.position}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'position',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={lessonForm.errors.position} />
                                        </Field>
                                        <Field label="XP">
                                            <input
                                                value={lessonForm.data.xp_reward}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'xp_reward',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                            <ErrorText message={lessonForm.errors.xp_reward} />
                                        </Field>
                                        <Field label="Dificuldade">
                                            <select
                                                value={lessonForm.data.difficulty}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'difficulty',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="basic">Fácil</option>
                                                <option value="intermediate">Média</option>
                                                <option value="advanced">Difícil</option>
                                            </select>
                                            <ErrorText
                                                message={lessonForm.errors.difficulty}
                                            />
                                        </Field>
                                        <Field label="Pré-requisito">
                                            <select
                                                value={lessonForm.data.prerequisite_lesson_id}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'prerequisite_lesson_id',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Sem pré-requisito
                                                </option>
                                                {lessonOptions.map((option) => (
                                                    <option
                                                        key={`lesson-option-${option.id}`}
                                                        value={String(option.id)}
                                                    >
                                                        {option.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <ErrorText
                                                message={
                                                    lessonForm.errors
                                                        .prerequisite_lesson_id
                                                }
                                            />
                                        </Field>
                                        <Field label="Objetivo" className="md:col-span-2">
                                            <textarea
                                                value={lessonForm.data.objective}
                                                onChange={(event) =>
                                                    lessonForm.setData(
                                                        'objective',
                                                        event.target.value,
                                                    )
                                                }
                                                className={textareaClass}
                                                rows={3}
                                            />
                                            <ErrorText
                                                message={lessonForm.errors.objective}
                                            />
                                        </Field>
                                        <div className="md:col-span-2">
                                            <button
                                                type="submit"
                                                disabled={lessonForm.processing}
                                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                                            >
                                                Criar lição
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
                            <BookOpenCheck className="h-4 w-4" />
                        </span>
                        Lições da trilha
                    </h2>
                    <div className="mt-4 space-y-2">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {lesson.position}. {lesson.title}
                                        </p>
                                        <p className="text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                            {lesson.questions_count} questões • dificuldade{' '}
                                            {lesson.difficulty} • +{lesson.xp_reward} XP
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/content/lessons/${lesson.id}`}
                                            className="inline-flex items-center gap-1 rounded-xl border border-[#BFE0FF] bg-white px-3 py-2 text-xs font-black text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#111C33] dark:text-[#9CC0FF]"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => removeLesson(lesson)}
                                            className="inline-flex items-center gap-1 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-3 py-2 text-xs font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {lessons.length === 0 ? (
                            <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-8 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                Ainda não há lições nesta trilha.
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
