import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BadgeCheck, ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { type FormEvent, type ReactNode, useEffect, useMemo } from 'react';

type Badge = {
    id: number;
    slug: string;
    name: string;
    description: string;
    image_path?: string | null;
    image_url?: string | null;
    unlock_metric?: string | null;
    unlock_target: number;
    is_active: boolean;
};

type MetricOption = {
    value: string;
    label: string;
};

type SharedProps = {
    errors: Record<string, string>;
    flash?: {
        success?: string;
    };
};

type Props = {
    badges: Badge[];
    metricOptions: MetricOption[];
};

export default function AdminBadges({ badges, metricOptions }: Props) {
    const { errors, flash } = usePage<SharedProps>().props;
    const form = useForm({
        name: '',
        slug: '',
        description: '',
        image: null as File | null,
        unlock_metric: metricOptions[0]?.value ?? 'total_xp',
        unlock_target: 1,
        is_active: '1',
    });

    const selectedMetricLabel = useMemo(
        () =>
            metricOptions.find((option) => option.value === form.data.unlock_metric)
                ?.label ?? 'Métrica',
        [form.data.unlock_metric, metricOptions],
    );

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/admin/badges', {
            forceFormData: true,
            onSuccess: () => {
                form.reset('name', 'slug', 'description', 'image', 'unlock_target');
                form.setData('unlock_metric', metricOptions[0]?.value ?? 'total_xp');
                form.setData('is_active', '1');
            },
        });
    };

    return (
        <>
            <Head title="Admin • Badges" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">Gamificação</p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">Badges</h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Personalize badges com ícone, cor, imagem (inclusive PNG transparente), métrica e meta de desbloqueio.
                    </p>
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
                    <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="inline-flex items-center gap-2 text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            <span className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                <BadgeCheck className="h-4 w-4" />
                            </span>
                            Novo badge
                        </h2>

                        <form onSubmit={submit} className="mt-4 space-y-4">
                            <Input
                                label="Nome"
                                name="name"
                                value={form.data.name}
                                onChange={(value) => form.setData('name', value)}
                                placeholder="Ex: Mestre da Sequência"
                                error={errors.name}
                            />

                            <Input
                                label="Slug (opcional)"
                                name="slug"
                                value={form.data.slug}
                                onChange={(value) => form.setData('slug', value)}
                                placeholder="mestre-da-sequencia"
                                error={errors.slug}
                            />

                            <Textarea
                                label="Descrição"
                                name="description"
                                value={form.data.description}
                                onChange={(value) => form.setData('description', value)}
                                placeholder="Descrição do badge..."
                                error={errors.description}
                            />

                            <label className="block">
                                <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Imagem da badge (opcional)
                                </span>
                                <div className="flex h-11 items-center rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 dark:border-[#2A3B5A] dark:bg-[#0B1428]">
                                    <ImagePlus className="mr-2 h-4 w-4 text-[#5B6B93] dark:text-[#8EA1C7]" />
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/png,image/webp,image/jpeg,image/jpg,image/avif"
                                        onChange={(event) => form.setData('image', event.target.files?.[0] ?? null)}
                                        className="w-full text-sm font-semibold text-[#2F3E63] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1565FF] file:px-3 file:py-1.5 file:text-xs file:font-black file:text-white dark:text-[#B4C3E3]"
                                    />
                                </div>
                                <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Suporta PNG transparente, WEBP, JPG e AVIF (até 5MB).
                                </p>
                                {errors.image ? <ErrorText>{errors.image}</ErrorText> : null}
                            </label>

                            <div className="grid gap-3 md:grid-cols-2">
                                <Select
                                    label="Métrica de desbloqueio"
                                    value={form.data.unlock_metric}
                                    onChange={(value) => form.setData('unlock_metric', value)}
                                    options={metricOptions}
                                    error={errors.unlock_metric}
                                />
                                <Input
                                    label={`Meta (${selectedMetricLabel})`}
                                    name="unlock_target"
                                    type="number"
                                    value={String(form.data.unlock_target)}
                                    onChange={(value) => form.setData('unlock_target', Number(value || 0))}
                                    placeholder="Ex: 10"
                                    error={errors.unlock_target}
                                />
                            </div>

                            <Select
                                label="Status"
                                value={form.data.is_active}
                                onChange={(value) => form.setData('is_active', value)}
                                options={[
                                    { value: '1', label: 'Ativo' },
                                    { value: '0', label: 'Inativo' },
                                ]}
                                error={errors.is_active}
                            />

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
                            >
                                {form.processing ? 'Criando...' : 'Criar badge'}
                            </button>
                        </form>
                    </article>

                    <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">Badges existentes</h2>
                        <div className="mt-4 space-y-2">
                            {badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            {badge.image_url ? (
                                                <img
                                                    src={badge.image_url}
                                                    alt={badge.name}
                                                    className="h-8 w-8 rounded-lg border border-[#BFE0FF] object-cover"
                                                />
                                            ) : null}
                                            <p className="truncate font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                                {badge.name}
                                            </p>
                                        </div>
                                        <span className="text-xs font-black text-[#1565FF] dark:text-[#9CC0FF]">
                                            {badge.is_active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                        slug {badge.slug} • meta {badge.unlock_target} • {badge.unlock_metric ?? 'sem métrica'}
                                    </p>
                                    <p className="mt-1 text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {badge.description}
                                    </p>
                                    <div className="mt-3">
                                        <Link
                                            href={`/admin/badges/${badge.id}/edit`}
                                            className="inline-flex h-9 items-center rounded-lg border border-[#BFE0FF] bg-[#F4F8FF] px-3 text-xs font-black uppercase tracking-[0.08em] text-[#1565FF] transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#EAF3FF] dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#9CC0FF] dark:hover:border-[#375786] dark:hover:bg-[#16233D]"
                                        >
                                            Editar
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {badges.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-6 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    Nenhum badge cadastrado.
                                </p>
                            ) : null}
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}

function Input({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    type = 'text',
}: {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    type?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <ErrorText>{error}</ErrorText> : null}
        </label>
    );
}

function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</span>
            <textarea
                rows={3}
                name={name}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 py-2 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <ErrorText>{error}</ErrorText> : null}
        </label>
    );
}

function Select({
    label,
    value,
    options,
    onChange,
    error,
}: {
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            >
                {options.map((option) => (
                    <option key={`option-${option.value}`} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error ? <ErrorText>{error}</ErrorText> : null}
        </label>
    );
}

function ErrorText({ children }: { children: ReactNode }) {
    return <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{children}</span>;
}
