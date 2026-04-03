import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { type FormEvent } from 'react';

type MetricOption = {
    value: string;
    label: string;
};

type Badge = {
    id: number;
    slug: string;
    name: string;
    description: string;
    image_url?: string | null;
    unlock_metric?: string | null;
    unlock_target: number;
    is_active: boolean;
};

type SharedProps = {
    errors: Record<string, string>;
    flash?: {
        success?: string;
    };
};

type Props = {
    badge: Badge;
    metricOptions: MetricOption[];
};

export default function AdminBadgeEdit({ badge, metricOptions }: Props) {
    const { errors, flash } = usePage<SharedProps>().props;
    const form = useForm({
        name: badge.name ?? '',
        slug: badge.slug ?? '',
        description: badge.description ?? '',
        image: null as File | null,
        remove_image: false,
        unlock_metric: badge.unlock_metric ?? (metricOptions[0]?.value ?? 'total_xp'),
        unlock_target: badge.unlock_target ?? 1,
        is_active: badge.is_active ? '1' : '0',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch(`/admin/badges/${badge.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Editar badge • ${badge.name}`} />

            <section className="space-y-5">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <Link
                        href="/admin/badges"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-[#1565FF]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para badges
                    </Link>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Editar badge
                    </h1>
                    <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Atualize as informações e imagem da badge.
                    </p>
                    {flash?.success ? (
                        <p className="mt-4 rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-sm font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                            {flash.success}
                        </p>
                    ) : null}
                </div>

                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                    <form onSubmit={submit} className="space-y-4">
                        <Input
                            label="Nome"
                            value={form.data.name}
                            onChange={(value) => form.setData('name', value)}
                            placeholder="Nome da badge"
                            error={errors.name}
                        />

                        <Input
                            label="Slug"
                            value={form.data.slug}
                            onChange={(value) => form.setData('slug', value)}
                            placeholder="slug-da-badge"
                            error={errors.slug}
                        />

                        <Textarea
                            label="Descrição"
                            value={form.data.description}
                            onChange={(value) => form.setData('description', value)}
                            placeholder="Descrição da badge"
                            error={errors.description}
                        />

                        <div className="grid gap-3 md:grid-cols-2">
                            <Select
                                label="Métrica de desbloqueio"
                                value={form.data.unlock_metric}
                                onChange={(value) => form.setData('unlock_metric', value)}
                                options={metricOptions}
                                error={errors.unlock_metric}
                            />
                            <Input
                                label="Meta de desbloqueio"
                                type="number"
                                value={String(form.data.unlock_target)}
                                onChange={(value) =>
                                    form.setData('unlock_target', Number(value || 0))
                                }
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

                        <label className="block">
                            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                                Trocar imagem (opcional)
                            </span>
                            <input
                                type="file"
                                accept="image/png,image/webp,image/jpeg,image/jpg,image/avif"
                                onChange={(event) =>
                                    form.setData('image', event.target.files?.[0] ?? null)
                                }
                                className="block h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 py-2 text-sm font-semibold text-[#0F1A3B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1565FF] file:px-3 file:py-1.5 file:text-xs file:font-black file:text-white outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                            />
                            {errors.image ? (
                                <span className="mt-1 block text-xs font-semibold text-[#AA2343]">
                                    {errors.image}
                                </span>
                            ) : null}
                        </label>

                        {badge.image_url ? (
                            <div className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]">
                                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">
                                    Imagem atual
                                </p>
                                <img
                                    src={badge.image_url}
                                    alt={badge.name}
                                    className="mt-2 h-20 w-20 rounded-xl border border-[#BFE0FF] object-cover"
                                />
                                <label className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                    <input
                                        type="checkbox"
                                        checked={form.data.remove_image}
                                        onChange={(event) =>
                                            form.setData('remove_image', event.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-[#BFE0FF] text-[#1565FF] focus:ring-[#1565FF]"
                                    />
                                    Remover imagem atual
                                </label>
                                {errors.remove_image ? (
                                    <span className="mt-1 block text-xs font-semibold text-[#AA2343]">
                                        {errors.remove_image}
                                    </span>
                                ) : null}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />
                            {form.processing ? 'Salvando...' : 'Salvar alterações'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

function Input({
    label,
    value,
    onChange,
    placeholder,
    error,
    type = 'text',
}: {
    label: string;
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
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}

function Textarea({
    label,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
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
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 py-2 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
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
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}
