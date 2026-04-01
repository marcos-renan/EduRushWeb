import { Form, Head, Link } from '@inertiajs/react';
import { Eye, EyeOff, GraduationCap, Lock, Mail, User2 } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { useAppearance } from '@/hooks/use-appearance';
import { login } from '@/routes';
import { store } from '@/routes/register';

const gradeOptions = [
    { label: '1º ano', value: 1 },
    { label: '2º ano', value: 2 },
    { label: '3º ano', value: 3 },
];

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [selectedGrade, setSelectedGrade] = useState(1);
    const { resolvedAppearance } = useAppearance();

    return (
        <>
            <Head title="Criar conta" />

            <div className="min-h-screen bg-[linear-gradient(135deg,#0A2A80_0%,#0D47C0_45%,#1565FF_100%)] p-4 sm:p-8">
                <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center rounded-3xl border border-white/25 bg-[#E8F2FF] p-4 shadow-[0_25px_80px_rgba(5,16,44,0.35)] dark:border-[#23324D] dark:bg-[#0F172A] sm:p-8">
                    <div className="grid w-full items-start gap-6 lg:grid-cols-[1.1fr_1fr]">
                        <div className="hidden rounded-3xl bg-[linear-gradient(165deg,#0D47C0_0%,#1565FF_100%)] p-8 text-white lg:block">
                            <img
                                src={
                                    resolvedAppearance === 'dark'
                                        ? '/branding/edurush-dark.png'
                                        : '/branding/edurush-light.png'
                                }
                                alt="EduRush"
                                className="h-20 w-auto"
                            />
                            <h1 className="mt-8 text-4xl font-black leading-tight">
                                Crie sua conta e comece hoje.
                            </h1>
                            <p className="mt-3 text-sm font-medium text-blue-100">
                                Personalize seu ano escolar e avance por trilhas
                                gamificadas no estilo EduRush.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#BFE0FF] bg-white p-5 dark:border-[#263753] dark:bg-[#111C33] sm:p-6">
                            <div className="mb-4 lg:hidden">
                                <img
                                    src={
                                        resolvedAppearance === 'dark'
                                            ? '/branding/edurush-dark.png'
                                            : '/branding/edurush-light.png'
                                    }
                                    alt="EduRush"
                                    className="h-14 w-auto"
                                />
                            </div>

                            <h2 className="text-2xl font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                Criar conta
                            </h2>
                            <p className="mt-1 text-sm font-medium text-[#5B6B93] dark:text-[#8EA1C7]">
                                Preencha seus dados para acessar a plataforma.
                            </p>

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password', 'password_confirmation']}
                                disableWhileProcessing
                                className="mt-5 space-y-4"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-1 block text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]"
                                            >
                                                Nome
                                            </label>
                                            <div className="relative">
                                                <User2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B93] dark:text-[#8EA1C7]" />
                                                <input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    required
                                                    autoFocus
                                                    autoComplete="name"
                                                    placeholder="Seu nome completo"
                                                    className="h-12 w-full rounded-xl border border-[#BFE0FF] bg-[#F4F8FF] pl-10 pr-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.name}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="username"
                                                className="mb-1 block text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]"
                                            >
                                                @Usuário
                                            </label>
                                            <div className="relative">
                                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-[#5B6B93] dark:text-[#8EA1C7]">
                                                    @
                                                </span>
                                                <input
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    required
                                                    autoCapitalize="none"
                                                    autoComplete="username"
                                                    placeholder="seuusuario"
                                                    className="h-12 w-full rounded-xl border border-[#BFE0FF] bg-[#F4F8FF] pl-8 pr-3 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.username}
                                                className="mt-1"
                                            />
                                        </div>

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
                                            <p className="mb-1 block text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]">
                                                Série
                                            </p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {gradeOptions.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className={`inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl border px-2 py-2 text-xs font-black transition ${
                                                            selectedGrade ===
                                                            option.value
                                                                ? 'border-[#1565FF] bg-[#1565FF] text-white'
                                                                : 'border-[#BFE0FF] bg-[#F4F8FF] text-[#1565FF] dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#9CC0FF]'
                                                        }`}
                                                    >
                                                        <GraduationCap className="h-3.5 w-3.5" />
                                                        {option.label}
                                                        <input
                                                            type="radio"
                                                            name="grade_year"
                                                            value={option.value}
                                                            checked={
                                                                selectedGrade ===
                                                                option.value
                                                            }
                                                            onChange={() =>
                                                                setSelectedGrade(
                                                                    option.value,
                                                                )
                                                            }
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                ))}
                                            </div>
                                            <InputError
                                                message={errors.grade_year}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="mb-1 block text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]"
                                            >
                                                Senha
                                            </label>
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
                                                    autoComplete="new-password"
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

                                        <div>
                                            <label
                                                htmlFor="password_confirmation"
                                                className="mb-1 block text-sm font-bold text-[#2F3E63] dark:text-[#B4C3E3]"
                                            >
                                                Confirmar senha
                                            </label>
                                            <div className="relative">
                                                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B93] dark:text-[#8EA1C7]" />
                                                <input
                                                    id="password_confirmation"
                                                    type={
                                                        showPasswordConfirmation
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password_confirmation"
                                                    required
                                                    autoComplete="new-password"
                                                    placeholder="••••••••"
                                                    className="h-12 w-full rounded-xl border border-[#BFE0FF] bg-[#F4F8FF] pl-10 pr-12 text-sm font-semibold text-[#0F1A3B] outline-none transition focus:border-[#1565FF] focus:ring-2 focus:ring-[#1565FF]/25 dark:border-[#263753] dark:bg-[#0B1428] dark:text-[#E7EEFF]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPasswordConfirmation(
                                                            (value) => !value,
                                                        )
                                                    }
                                                    className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[#5B6B93] transition hover:text-[#1565FF] dark:text-[#8EA1C7] dark:hover:text-[#9CC0FF]"
                                                    aria-label={
                                                        showPasswordConfirmation
                                                            ? 'Ocultar senha'
                                                            : 'Mostrar senha'
                                                    }
                                                >
                                                    {showPasswordConfirmation ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-1"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1565FF] px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(21,101,255,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                            data-test="register-user-button"
                                        >
                                            {processing
                                                ? 'Criando conta...'
                                                : 'Criar conta'}
                                        </button>
                                    </>
                                )}
                            </Form>

                            <div className="mt-4 flex justify-end">
                                <Link
                                    href={login()}
                                    className="text-sm font-bold text-[#1565FF] hover:underline"
                                >
                                    Já tenho conta
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

