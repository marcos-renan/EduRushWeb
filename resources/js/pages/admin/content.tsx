import { Form, Head, usePage } from '@inertiajs/react';
import { BookOpenCheck, CircleHelp, Route, Sparkles } from 'lucide-react';

type Subject = {
    id: number;
    name: string;
    slug: string;
    color_hex: string;
    is_active: boolean;
    trails_count: number;
};

type Trail = {
    id: number;
    title: string;
    slug: string;
    grade_year: number;
    position: number;
    is_active: boolean;
    lessons_count: number;
    subject?: {
        name: string;
    };
};

type Lesson = {
    id: number;
    title: string;
    slug: string;
    position: number;
    difficulty: string;
    xp_reward: number;
    is_active: boolean;
    questions_count: number;
    trail?: {
        title: string;
        subject?: {
            name: string;
        };
    };
};

type Option = {
    id: number;
    name?: string;
    title?: string;
    subject?: {
        name: string;
    };
    trail?: {
        title: string;
    };
};

type SharedProps = {
    errors: Record<string, string>;
    flash?: {
        success?: string;
        error?: string;
    };
};

type Props = {
    subjects: Subject[];
    trails: Trail[];
    lessons: Lesson[];
    subjectOptions: Option[];
    trailOptions: Option[];
    lessonOptions: Option[];
};

export default function AdminContent({
    subjects,
    trails,
    lessons,
    subjectOptions,
    trailOptions,
    lessonOptions,
}: Props) {
    const { errors, flash } = usePage<SharedProps>().props;

    return (
        <>
            <Head title="Admin • Conteúdo" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">
                        Gestão pedagógica
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Matérias, trilhas, lições e questões
                    </h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Cadastre novos conteúdos por ano escolar e mantenha as trilhas
                        organizadas para os alunos.
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

                <div className="grid gap-4 xl:grid-cols-2">
                    <Card title="Nova matéria" icon={<BookOpenCheck className="h-4 w-4" />}>
                        <Form action="/admin/subjects" method="post" className="space-y-3">
                            <InputField label="Nome" name="name" placeholder="Ex: Matemática" error={errors.name} />
                            <InputField label="Slug (opcional)" name="slug" placeholder="matematica" error={errors.slug} />
                            <InputField label="Cor (hex)" name="color_hex" placeholder="#2563EB" error={errors.color_hex} />
                            <InputField label="Ícone (emoji/símbolo)" name="icon" placeholder="📘" error={errors.icon} />
                            <TextAreaField label="Descrição" name="description" placeholder="Descrição curta da matéria..." error={errors.description} />
                            <SelectField
                                label="Status"
                                name="is_active"
                                options={[
                                    { label: 'Ativa', value: '1' },
                                    { label: 'Inativa', value: '0' },
                                ]}
                            />
                            <SubmitButton text="Criar matéria" />
                        </Form>
                    </Card>

                    <Card title="Nova trilha" icon={<Route className="h-4 w-4" />}>
                        <Form action="/admin/trails" method="post" className="space-y-3">
                            <SelectField
                                label="Matéria"
                                name="subject_id"
                                options={subjectOptions.map((subject) => ({
                                    label: subject.name ?? `Matéria ${subject.id}`,
                                    value: String(subject.id),
                                }))}
                                error={errors.subject_id}
                            />
                            <InputField label="Título" name="title" placeholder="Ex: Álgebra linear essencial" error={errors.title} />
                            <InputField label="Slug (opcional)" name="slug" placeholder="algebra-linear-essencial" error={errors.slug} />
                            <SelectField
                                label="Ano"
                                name="grade_year"
                                options={[
                                    { label: '1º ano', value: '1' },
                                    { label: '2º ano', value: '2' },
                                    { label: '3º ano', value: '3' },
                                ]}
                                error={errors.grade_year}
                            />
                            <InputField label="Posição" name="position" type="number" placeholder="1" error={errors.position} />
                            <TextAreaField label="Descrição" name="description" placeholder="Objetivo geral da trilha..." error={errors.description} />
                            <SelectField
                                label="Status"
                                name="is_active"
                                options={[
                                    { label: 'Ativa', value: '1' },
                                    { label: 'Inativa', value: '0' },
                                ]}
                            />
                            <SubmitButton text="Criar trilha" />
                        </Form>
                    </Card>

                    <Card title="Nova lição" icon={<Sparkles className="h-4 w-4" />}>
                        <Form action="/admin/lessons" method="post" className="space-y-3">
                            <SelectField
                                label="Trilha"
                                name="trail_id"
                                options={trailOptions.map((trail) => ({
                                    label: `${trail.title ?? `Trilha ${trail.id}`} • ${trail.subject?.name ?? ''}`,
                                    value: String(trail.id),
                                }))}
                                error={errors.trail_id}
                            />
                            <InputField label="Título" name="title" placeholder="Ex: Equação do 2º grau" error={errors.title} />
                            <InputField label="Slug (opcional)" name="slug" placeholder="equacao-segundo-grau" error={errors.slug} />
                            <InputField label="Posição" name="position" type="number" placeholder="1" error={errors.position} />
                            <InputField label="Objetivo" name="objective" placeholder="O que o aluno vai aprender..." error={errors.objective} />
                            <TextAreaField label="Conteúdo (opcional)" name="content" placeholder="Texto base da aula..." error={errors.content} />
                            <InputField label="XP da lição" name="xp_reward" type="number" placeholder="20" error={errors.xp_reward} />
                            <SelectField
                                label="Dificuldade"
                                name="difficulty"
                                options={[
                                    { label: 'Fácil (basic)', value: 'basic' },
                                    { label: 'Média (intermediate)', value: 'intermediate' },
                                    { label: 'Difícil (advanced)', value: 'advanced' },
                                ]}
                                error={errors.difficulty}
                            />
                            <SelectField
                                label="Pré-requisito (opcional)"
                                name="prerequisite_lesson_id"
                                options={[
                                    { label: 'Sem pré-requisito', value: '' },
                                    ...lessonOptions.map((lesson) => ({
                                        label: lesson.title ?? `Lição ${lesson.id}`,
                                        value: String(lesson.id),
                                    })),
                                ]}
                                error={errors.prerequisite_lesson_id}
                            />
                            <SelectField
                                label="Status"
                                name="is_active"
                                options={[
                                    { label: 'Ativa', value: '1' },
                                    { label: 'Inativa', value: '0' },
                                ]}
                            />
                            <SubmitButton text="Criar lição" />
                        </Form>
                    </Card>

                    <Card title="Nova questão" icon={<CircleHelp className="h-4 w-4" />}>
                        <Form action="/admin/questions" method="post" className="space-y-3">
                            <SelectField
                                label="Lição"
                                name="lesson_id"
                                options={lessonOptions.map((lesson) => ({
                                    label: `${lesson.title ?? `Lição ${lesson.id}`} • ${lesson.trail?.title ?? ''}`,
                                    value: String(lesson.id),
                                }))}
                                error={errors.lesson_id}
                            />
                            <InputField label="Posição" name="position" type="number" placeholder="1" error={errors.position} />
                            <TextAreaField label="Enunciado" name="prompt" placeholder="Digite a pergunta completa..." error={errors.prompt} />
                            <InputField label="Opção A" name="option_0" placeholder="Resposta A" error={errors.option_0} />
                            <InputField label="Opção B" name="option_1" placeholder="Resposta B" error={errors.option_1} />
                            <InputField label="Opção C" name="option_2" placeholder="Resposta C" error={errors.option_2} />
                            <InputField label="Opção D" name="option_3" placeholder="Resposta D" error={errors.option_3} />
                            <SelectField
                                label="Alternativa correta"
                                name="correct_option"
                                options={[
                                    { label: 'A (índice 0)', value: '0' },
                                    { label: 'B (índice 1)', value: '1' },
                                    { label: 'C (índice 2)', value: '2' },
                                    { label: 'D (índice 3)', value: '3' },
                                ]}
                                error={errors.correct_option}
                            />
                            <TextAreaField label="Explicação (opcional)" name="explanation" placeholder="Explique por que esta é a resposta correta..." error={errors.explanation} />
                            <InputField label="XP da questão" name="xp_reward" type="number" placeholder="5" error={errors.xp_reward} />
                            <SelectField
                                label="Status"
                                name="is_active"
                                options={[
                                    { label: 'Ativa', value: '1' },
                                    { label: 'Inativa', value: '0' },
                                ]}
                            />
                            <SubmitButton text="Criar questão" />
                        </Form>
                    </Card>
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <ListCard title="Matérias cadastradas" items={subjects.map((subject) => ({
                        key: subject.id,
                        title: subject.name,
                        subtitle: `${subject.trails_count} trilhas • slug ${subject.slug}`,
                        status: subject.is_active ? 'Ativa' : 'Inativa',
                    }))} />

                    <ListCard title="Trilhas recentes" items={trails.map((trail) => ({
                        key: trail.id,
                        title: trail.title,
                        subtitle: `${trail.subject?.name ?? 'Sem matéria'} • ${trail.grade_year}º ano • ${trail.lessons_count} lições`,
                        status: trail.is_active ? 'Ativa' : 'Inativa',
                    }))} />

                    <ListCard title="Lições recentes" items={lessons.map((lesson) => ({
                        key: lesson.id,
                        title: lesson.title,
                        subtitle: `${lesson.trail?.subject?.name ?? 'Sem matéria'} • ${lesson.questions_count} questões • ${lesson.difficulty}`,
                        status: lesson.is_active ? 'Ativa' : 'Inativa',
                    }))} />
                </div>
            </section>
        </>
    );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
            <h2 className="inline-flex items-center gap-2 text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                <span className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                    {icon}
                </span>
                {title}
            </h2>
            <div className="mt-4">{children}</div>
        </article>
    );
}

function ListCard({
    title,
    items,
}: {
    title: string;
    items: Array<{ key: number; title: string; subtitle: string; status: string }>;
}) {
    return (
        <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
            <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">{title}</h2>
            <div className="mt-4 space-y-2">
                {items.slice(0, 12).map((item) => (
                    <div
                        key={item.key}
                        className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">{item.title}</p>
                            <span className="text-xs font-black text-[#1565FF] dark:text-[#9CC0FF]">{item.status}</span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">{item.subtitle}</p>
                    </div>
                ))}
                {items.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-6 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                        Sem dados no momento.
                    </p>
                ) : null}
            </div>
        </article>
    );
}

function InputField({
    label,
    name,
    placeholder,
    error,
    type = 'text',
}: {
    label: string;
    name: string;
    placeholder?: string;
    error?: string;
    type?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}

function TextAreaField({
    label,
    name,
    placeholder,
    error,
}: {
    label: string;
    name: string;
    placeholder?: string;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </span>
            <textarea
                name={name}
                placeholder={placeholder}
                rows={3}
                className="w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 py-2 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}

function SelectField({
    label,
    name,
    options,
    error,
}: {
    label: string;
    name: string;
    options: Array<{ label: string; value: string }>;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                {label}
            </span>
            <select
                name={name}
                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            >
                {options.map((option) => (
                    <option key={`${name}-${option.value}-${option.label}`} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}

function SubmitButton({ text }: { text: string }) {
    return (
        <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5"
        >
            {text}
        </button>
    );
}
