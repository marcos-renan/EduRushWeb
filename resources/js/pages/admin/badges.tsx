import { Form, Head, usePage } from '@inertiajs/react';
import { BadgeCheck } from 'lucide-react';

type Badge = {
    id: number;
    slug: string;
    name: string;
    description: string;
    icon?: string | null;
    color_hex: string;
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
    badges: Badge[];
};

export default function AdminBadges({ badges }: Props) {
    const { errors, flash } = usePage<SharedProps>().props;

    return (
        <>
            <Head title="Admin • Badges" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">Gamificação</p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">Badges</h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Configure badges e critérios de desbloqueio para recompensar progresso.
                    </p>
                    {flash?.success ? (
                        <p className="mt-4 rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-sm font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                            {flash.success}
                        </p>
                    ) : null}
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
                    <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="inline-flex items-center gap-2 text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                            <span className="inline-flex rounded-full bg-[#E8F2FF] p-2 text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                <BadgeCheck className="h-4 w-4" />
                            </span>
                            Novo badge
                        </h2>

                        <Form action="/admin/badges" method="post" className="mt-4 space-y-3">
                            <Input label="Nome" name="name" placeholder="Ex: Mestre da Sequência" error={errors.name} />
                            <Input label="Slug (opcional)" name="slug" placeholder="mestre-da-sequencia" error={errors.slug} />
                            <Textarea label="Descrição" name="description" placeholder="Descrição do badge..." error={errors.description} />
                            <Input label="Ícone (emoji/símbolo)" name="icon" placeholder="🏅" error={errors.icon} />
                            <Input label="Cor (hex)" name="color_hex" placeholder="#FFB43F" error={errors.color_hex} />
                            <Input label="Métrica de desbloqueio" name="unlock_metric" placeholder="streak_days" error={errors.unlock_metric} />
                            <Input label="Meta de desbloqueio" name="unlock_target" type="number" placeholder="7" error={errors.unlock_target} />
                            <Select
                                label="Status"
                                name="is_active"
                                options={[
                                    { value: '1', label: 'Ativo' },
                                    { value: '0', label: 'Inativo' },
                                ]}
                            />
                            <button
                                type="submit"
                                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5"
                            >
                                Criar badge
                            </button>
                        </Form>
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
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">
                                            {badge.icon ? `${badge.icon} ` : ''}
                                            {badge.name}
                                        </p>
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
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</span>
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

function Textarea({
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
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</span>
            <textarea
                rows={3}
                name={name}
                placeholder={placeholder}
                className="w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 py-2 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            />
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}

function Select({
    label,
    name,
    options,
    error,
}: {
    label: string;
    name: string;
    options: Array<{ value: string; label: string }>;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.08em] text-[#5B6B93] dark:text-[#8EA1C7]">{label}</span>
            <select
                name={name}
                className="h-11 w-full rounded-xl border border-[#C8E0FF] bg-[#F5F9FF] px-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
            >
                {options.map((option) => (
                    <option key={`${name}-${option.value}`} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error ? <span className="mt-1 block text-xs font-semibold text-[#AA2343]">{error}</span> : null}
        </label>
    );
}
