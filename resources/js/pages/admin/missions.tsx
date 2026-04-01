import { Form, Head, usePage } from '@inertiajs/react';
import { Target } from 'lucide-react';

type Mission = {
    id: number;
    mission_key: string;
    mission_type: 'daily' | 'weekly';
    title: string;
    description: string;
    metric: string;
    target: number;
    reward_xp: number;
    is_active: boolean;
};

type SharedProps = {
    errors: Record<string, string>;
    flash?: {
        success?: string;
    };
};

type Props = {
    missions: Mission[];
};

export default function AdminMissions({ missions }: Props) {
    const { errors, flash } = usePage<SharedProps>().props;

    return (
        <>
            <Head title="Admin • Missões" />

            <section className="space-y-6">
                <div className="rounded-3xl border border-[#BFE0FF] bg-white p-6 dark:border-[#263753] dark:bg-[#111C33]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1565FF]">Gamificação</p>
                    <h1 className="mt-2 text-3xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                        Missões
                    </h1>
                    <p className="mt-2 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                        Crie missões diárias e semanais para impulsionar o engajamento.
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
                                <Target className="h-4 w-4" />
                            </span>
                            Nova missão
                        </h2>

                        <Form action="/admin/missions" method="post" className="mt-4 space-y-3">
                            <Input label="Chave (opcional)" name="mission_key" placeholder="daily_lessons_3" error={errors.mission_key} />
                            <Select
                                label="Tipo"
                                name="mission_type"
                                error={errors.mission_type}
                                options={[
                                    { value: 'daily', label: 'Diária' },
                                    { value: 'weekly', label: 'Semanal' },
                                ]}
                            />
                            <Input label="Título" name="title" placeholder="Concluir 3 lições" error={errors.title} />
                            <Textarea label="Descrição" name="description" placeholder="Complete 3 lições hoje para ganhar XP." error={errors.description} />
                            <Input label="Métrica" name="metric" placeholder="lessons_completed" error={errors.metric} />
                            <Input label="Meta" name="target" type="number" placeholder="3" error={errors.target} />
                            <Input label="Recompensa XP" name="reward_xp" type="number" placeholder="80" error={errors.reward_xp} />
                            <Select
                                label="Status"
                                name="is_active"
                                options={[
                                    { value: '1', label: 'Ativa' },
                                    { value: '0', label: 'Inativa' },
                                ]}
                            />
                            <button
                                type="submit"
                                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5"
                            >
                                Criar missão
                            </button>
                        </Form>
                    </article>

                    <article className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33]">
                        <h2 className="text-lg font-black text-[#0F1A3B] dark:text-[#E7EEFF]">Missões existentes</h2>
                        <div className="mt-4 space-y-2">
                            {missions.map((mission) => (
                                <div
                                    key={mission.id}
                                    className="rounded-2xl border border-[#D9E9FF] bg-[#F8FBFF] p-3 dark:border-[#263753] dark:bg-[#0B1428]"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-bold text-[#0F1A3B] dark:text-[#E7EEFF]">{mission.title}</p>
                                        <span className="text-xs font-black text-[#1565FF] dark:text-[#9CC0FF]">
                                            {mission.is_active ? 'Ativa' : 'Inativa'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {mission.mission_type === 'daily' ? 'Diária' : 'Semanal'} • {mission.metric} • meta {mission.target} • +{mission.reward_xp} XP
                                    </p>
                                    <p className="mt-1 text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                        {mission.description}
                                    </p>
                                </div>
                            ))}
                            {missions.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-[#BFE0FF] bg-[#F8FBFF] px-4 py-6 text-center text-sm font-semibold text-[#5B6B93] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#8EA1C7]">
                                    Nenhuma missão cadastrada.
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
