import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Moon, Sun, UserCircle2 } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

type SharedProps = {
    auth: {
        user?: {
            name?: string;
            role?: string;
        } | null;
    };
};

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const page = usePage<SharedProps>();
    const role = page.props.auth?.user?.role ?? 'user';
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const backHref =
        role === 'admin' ? '/admin/dashboard' : '/student/dashboard';

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#0A2A80_0%,#0D47C0_45%,#1565FF_100%)] p-4 sm:p-6">
            <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col rounded-3xl border border-white/25 bg-[#E8F2FF] p-4 shadow-[0_25px_80px_rgba(5,16,44,0.35)] dark:border-[#23324D] dark:bg-[#0F172A] sm:p-6">
                <header className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-[#BFE0FF] bg-white p-3 dark:border-[#263753] dark:bg-[#111C33]">
                    <div className="flex items-center gap-2">
                        <Link
                            href={backHref}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#BFE0FF] bg-[#F4F8FF] text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#9CC0FF]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <img
                            src={
                                resolvedAppearance === 'dark'
                                    ? '/branding/edurush-dark.png'
                                    : '/branding/edurush-light.png'
                            }
                            alt="EduRush"
                            className="h-10 w-auto"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                updateAppearance(
                                    resolvedAppearance === 'dark'
                                        ? 'light'
                                        : 'dark',
                                )
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#BFE0FF] bg-[#F4F8FF] text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#9CC0FF]"
                            aria-label="Alternar tema"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </button>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#BFE0FF] bg-[#F4F8FF] px-3 py-1.5 text-xs font-black uppercase tracking-[0.08em] text-[#1565FF] dark:border-[#2A3B5A] dark:bg-[#0B1428] dark:text-[#9CC0FF]">
                            <UserCircle2 className="h-4 w-4" />
                            Perfil
                        </span>
                    </div>
                </header>

                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
