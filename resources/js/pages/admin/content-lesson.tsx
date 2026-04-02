import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

type Lesson = {
    id: number;
    trail_id: number;
    title: string;
    slug: string;
    position: number;
    objective?: string | null;
    content?: string | null;
    xp_reward: number;
    difficulty: string;
    is_active: boolean;
    prerequisite_lesson_id?: number | null;
    trail: {
        id: number;
        title: string;
        subject_id: number;
        subject?: {
            id: number;
            name: string;
        };
    };
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
    lesson: Lesson;
    lessonOptions: LessonOption[];
};

export default function AdminContentLesson({ lesson, lessonOptions }: Props) {
    const page = usePage<SharedProps>();

    const lessonForm = useForm({
        title: lesson.title,
        slug: lesson.slug,
        position: String(lesson.position),
        objective: lesson.objective ?? '',
        content: lesson.content ?? '',
        xp_reward: String(lesson.xp_reward),
        difficulty: lesson.difficulty ?? 'basic',
        prerequisite_lesson_id: lesson.prerequisite_lesson_id
            ? String(lesson.prerequisite_lesson_id)
            : '',
        is_active: lesson.is_active ? '1' : '0',
    });

    const removeLesson = () => {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a lição "${lesson.title}"?`,
        );
        if (!confirmed) return;

        router.delete(`/admin/content/lessons/${lesson.id}`);
    };

    return (
        <>
            <Head title={`Admin • ${lesson.title}`} />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href={`/admin/content/trails/${lesson.trail_id}`}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para trilha
                    </Link>
                    <h1 className="mt-3 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        {lesson.title}
                    </h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Trilha: {lesson.trail.title}
                        {lesson.trail.subject?.name
                            ? ` • Matéria: ${lesson.trail.subject.name}`
                            : ''}
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
                            <Pencil className="h-4 w-4" />
                        </span>
                        Editar lição
                    </h2>

                    <form
                        className="mt-4 grid gap-3 md:grid-cols-2"
                        onSubmit={(event) => {
                            event.preventDefault();
                            lessonForm.patch(`/admin/content/lessons/${lesson.id}`, {
                                preserveScroll: true,
                            });
                        }}
                    >
                        <Field label="Título">
                            <input
                                value={lessonForm.data.title}
                                onChange={(event) =>
                                    lessonForm.setData('title', event.target.value)
                                }
                                className={inputClass}
                            />
                            <ErrorText message={lessonForm.errors.title} />
                        </Field>
                        <Field label="Slug">
                            <input
                                value={lessonForm.data.slug}
                                onChange={(event) =>
                                    lessonForm.setData('slug', event.target.value)
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
                            <ErrorText message={lessonForm.errors.difficulty} />
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
                                <option value="">Sem pré-requisito</option>
                                {lessonOptions.map((option) => (
                                    <option
                                        key={`lesson-prerequisite-${option.id}`}
                                        value={String(option.id)}
                                    >
                                        {option.title}
                                    </option>
                                ))}
                            </select>
                            <ErrorText
                                message={lessonForm.errors.prerequisite_lesson_id}
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
                            <ErrorText message={lessonForm.errors.objective} />
                        </Field>
                        <Field label="Conteúdo" className="md:col-span-2">
                            <textarea
                                value={lessonForm.data.content}
                                onChange={(event) =>
                                    lessonForm.setData(
                                        'content',
                                        event.target.value,
                                    )
                                }
                                className={textareaClass}
                                rows={6}
                            />
                            <ErrorText message={lessonForm.errors.content} />
                        </Field>
                        <div className="md:col-span-2 flex flex-wrap items-center gap-2">
                            <button
                                type="submit"
                                disabled={lessonForm.processing}
                                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1565FF] px-5 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                            >
                                Salvar lição
                            </button>
                            <button
                                type="button"
                                onClick={removeLesson}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#F2BDCA] bg-[#FFEFF3] px-4 text-sm font-black text-[#AA2343] dark:border-[#7A3041] dark:bg-[#30141D] dark:text-[#FFB6C3]"
                            >
                                <Trash2 className="h-4 w-4" />
                                Excluir lição
                            </button>
                        </div>
                    </form>
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
