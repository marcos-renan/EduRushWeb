import { Link, usePage } from '@inertiajs/react';
import { Crown, LogOut, Moon, Sun, User2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';

type SharedProps = {
    auth: {
        user?: {
            name?: string;
            email?: string;
            role?: string;
            profile_photo_url?: string | null;
            profile_photo_path?: string | null;
        } | null;
    };
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const page = usePage<SharedProps>();
    const user = page.props.auth?.user ?? null;
    const [open, setOpen] = useState(false);
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const initials = useMemo(() => {
        const name = String(user?.name ?? 'A').trim();
        return name.charAt(0).toUpperCase();
    }, [user?.name]);

    const photoUrl = useMemo(() => {
        if (user?.profile_photo_url) return user.profile_photo_url;
        if (!user?.profile_photo_path) return null;
        return `/storage/${String(user.profile_photo_path).replace(/^\/+/, '')}`;
    }, [user?.profile_photo_path, user?.profile_photo_url]);

    const navItems = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Conteúdo', href: '/admin/content' },
        { label: 'Missões', href: '/admin/missions' },
        { label: 'Badges', href: '/admin/badges' },
        { label: 'Alunos', href: '/admin/students' },
    ];

    return (
        <div className="min-h-screen bg-[linear-gradient(140deg,#071B4D_0%,#0B2B7D_50%,#1147BF_100%)] p-3 sm:p-5">
            <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1500px] flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#EAF2FF] shadow-[0_28px_88px_rgba(3,14,43,0.36)] dark:border-[#24324A] dark:bg-[#0D1423]">
                <header className="sticky top-0 z-30 border-b border-[#C5DEFF] bg-white/92 px-4 py-3 backdrop-blur sm:px-6 dark:border-[#1F2B42] dark:bg-[#0C1322]/95">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/dashboard" className="inline-flex items-center gap-2">
                            <img
                                src={
                                    resolvedAppearance === 'dark'
                                        ? '/branding/edurush-dark.png'
                                        : '/branding/edurush-light.png'
                                }
                                alt="EduRush"
                                className="h-10 w-auto sm:h-11"
                            />
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#FFD783] bg-[#FFF5D8] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#946200] dark:border-[#5A4520] dark:bg-[#2B220F] dark:text-[#FFD783]">
                                <Crown className="h-3.5 w-3.5" />
                                Admin
                            </span>
                        </Link>

                        <nav className="ml-2 hidden items-center gap-2 lg:flex">
                            {navItems.map((item) => {
                                const isActive = page.url.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'rounded-full px-4 py-2 text-sm font-extrabold transition',
                                            isActive
                                                ? 'bg-[#1565FF] text-white shadow-[0_8px_22px_rgba(21,101,255,0.34)]'
                                                : 'text-[#2F3E63] hover:bg-[#E8F2FF] dark:text-[#B4C3E3] dark:hover:bg-[#132038]',
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    updateAppearance(
                                        resolvedAppearance === 'dark' ? 'light' : 'dark',
                                    )
                                }
                                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#C5DEFF] bg-white text-[#1565FF] transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#EAF3FF] hover:shadow-md dark:border-[#2A3B5A] dark:bg-[#111C33] dark:text-[#B4C3E3] dark:hover:border-[#3C557C] dark:hover:bg-[#16233D]"
                                aria-label="Alternar tema"
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpen((value) => !value)}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#C5DEFF] bg-white p-1 pr-3 transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#F3F8FF] hover:shadow-md dark:border-[#2A3B5A] dark:bg-[#111C33] dark:hover:border-[#3C557C] dark:hover:bg-[#16233D]"
                                >
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt={user?.name ?? 'Perfil'}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F2FF] text-sm font-black text-[#1565FF] dark:bg-[#162846] dark:text-[#9CC0FF]">
                                            {initials}
                                        </span>
                                    )}
                                    <span className="hidden max-w-[170px] truncate text-sm font-bold text-[#2F3E63] sm:block dark:text-[#E7EEFF]">
                                        {user?.name ?? 'Administrador'}
                                    </span>
                                </button>

                                {open ? (
                                    <div className="absolute right-0 top-[calc(100%+8px)] w-72 rounded-2xl border border-[#C5DEFF] bg-white p-3 shadow-xl dark:border-[#2A3B5A] dark:bg-[#111C33]">
                                        <div className="rounded-xl bg-[#EEF5FF] p-3 dark:bg-[#0A1326]">
                                            <p className="text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                                {user?.name ?? 'Administrador'}
                                            </p>
                                            <p className="truncate text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                                {user?.email ?? ''}
                                            </p>
                                            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#1565FF] dark:text-[#9CC0FF]">
                                                Perfil: {user?.role ?? 'admin'}
                                            </p>
                                        </div>

                                        <div className="mt-2 space-y-1">
                                            <Link
                                                href="/admin/profile"
                                                className="inline-flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#2F3E63] transition hover:bg-[#E8F2FF] dark:text-[#B4C3E3] dark:hover:bg-[#142645]"
                                                onClick={() => setOpen(false)}
                                            >
                                                <User2 className="h-4 w-4" />
                                                Perfil
                                            </Link>
                                            <Link
                                                href={logout()}
                                                method="post"
                                                as="button"
                                                className="inline-flex w-full cursor-pointer items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-left text-sm font-semibold text-[#D92D4E] transition hover:-translate-y-0.5 hover:border-[#F2BDCA] hover:bg-[#FFEFF3] dark:hover:border-[#7A3041] dark:hover:bg-[#30141D]"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Sair
                                            </Link>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">{children}</main>
            </div>
        </div>
    );
}
