import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { useAppearance } from '@/hooks/use-appearance';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const { resolvedAppearance } = useAppearance();

    return (
        <>
            <Head title="Entrar" />

            <div className="min-h-screen bg-[linear-gradient(135deg,#0A2A80_0%,#0D47C0_45%,#1565FF_100%)] p-4 sm:p-8">
                <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center rounded-3xl border border-white/25 bg-[#E8F2FF] p-4 shadow-[0_25px_80px_rgba(5,16,44,0.35)] dark:border-[#23324D] dark:bg-[#0F172A] sm:p-8">
                    <div className="grid w-full items-center gap-6 lg:grid-cols-[1.1fr_1fr]">
                        <div className="hidden rounded-3xl bg-[linear-gradient(165deg,#0D47C0_0%,#1565FF_100%)] p-8 text-white lg:flex lg:flex-col lg:items-center lg:text-center">
                            <img
                                src={
                                    resolvedAppearance === 'dark'
                                        ? '/branding/edurush-dark.png'
                                        : '/branding/edurush-light.png'
                                }
                                alt="EduRush"
                                className="h-28 w-auto"
                            />
                            <h1 className="mt-8 text-4xl font-black leading-tight">
                                Estude no ritmo de jogo.
                            </h1>
                        </div>

                        <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33] sm:p-6">
                            <div className="mb-4 flex justify-center lg:hidden">
                                <img
                                    src={
                                        resolvedAppearance === 'dark'
                                            ? '/branding/edurush-dark.png'
                                            : '/branding/edurush-light.png'
                                    }
                                    alt="EduRush"
                                    className="h-20 w-auto"
                                />
                            </div>

                            <h2 className="text-2xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                Entrar na conta
                            </h2>
                            <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                Use seu e-mail e senha para acessar seu painel.
                            </p>

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="mt-5 space-y-4"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-1 block text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]"
                                            >
                                                E-mail
                                            </label>
                                            <div className="relative">
                                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B93] dark:text-[#8EA1C7]" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    autoComplete="email"
                                                    placeholder="aluno@edurush.com"
                                                    className="h-12 w-full rounded-xl border border-[#BFE0FF] bg-[#F4F8FF] pl-10 pr-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-1 flex items-center justify-between gap-3">
                                                <label
                                                    htmlFor="password"
                                                    className="text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]"
                                                >
                                                    Senha
                                                </label>
                                                {canResetPassword ? (
                                                    <a
                                                        href={request().url}
                                                        className="text-xs font-bold text-[#1565FF] hover:underline"
                                                    >
                                                        Esqueceu a senha?
                                                    </a>
                                                ) : null}
                                            </div>
                                            <div className="relative">
                                                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B93] dark:text-[#8EA1C7]" />
                                                <input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    required
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="h-12 w-full rounded-xl border border-[#BFE0FF] bg-[#F4F8FF] pl-10 pr-12 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (value) => !value,
                                                        )
                                                    }
                                                    className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[#5B6B93] transition hover:text-[#1565FF] dark:text-[#8EA1C7] dark:hover:text-[#9CC0FF]"
                                                    aria-label={
                                                        showPassword
                                                            ? 'Ocultar senha'
                                                            : 'Mostrar senha'
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={errors.password}
                                                className="mt-1"
                                            />
                                        </div>

                                        <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                className="h-4 w-4 rounded border-[#BFE0FF] text-[#1565FF] focus:ring-[#1565FF]"
                                            />
                                            Lembrar de mim
                                        </label>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                            data-test="login-button"
                                        >
                                            {processing
                                                ? 'Entrando...'
                                                : 'Entrar'}
                                        </button>
                                    </>
                                )}
                            </Form>

                            {canRegister ? (
                                <div className="mt-4 flex justify-end">
                                    <a
                                        href={register().url}
                                        className="text-sm font-bold text-[#1565FF] hover:underline"
                                    >
                                        Criar conta
                                    </a>
                                </div>
                            ) : null}

                            {status ? (
                                <p className="mt-4 rounded-xl border border-[#A6E9C8] bg-[#ECFAF3] px-3 py-2 text-center text-xs font-semibold text-[#0A7A4F] dark:border-[#275A43] dark:bg-[#13281F] dark:text-[#9BE8C8]">
                                    {status}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
