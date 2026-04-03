import { Link, usePage } from '@inertiajs/react';
import { LogOut, Moon, Sun, User2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import energyAnimation from '@/assets/animations/energy.json';
import SafeLottie from '@/components/safe-lottie';
import { logout } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type StudentProfileProps = {
    energy?: number;
    level?: number;
    total_xp?: number;
    current_streak?: number;
};

type SharedProps = {
    auth: {
        user?: {
            name?: string;
            email?: string;
            profile_photo_url?: string | null;
            profile_photo_path?: string | null;
        } | null;
    };
    studentProfile?: StudentProfileProps | null;
};

type EnergyChangedDetail = {
    energy?: number;
    delta?: number;
};

export default function StudentLayout({
    children,
    studentProfile,
}: {
    children: React.ReactNode;
    studentProfile?: StudentProfileProps | null;
}) {
    const page = usePage<SharedProps>();
    const user = page.props.auth?.user ?? null;
    const profile = studentProfile ?? page.props.studentProfile ?? null;
    const [open, setOpen] = useState(false);
    const [displayEnergy, setDisplayEnergy] = useState<number>(
        profile?.energy ?? 0,
    );
    const [energyFlash, setEnergyFlash] = useState<'up' | 'down' | null>(null);
    const [showEnergyFx, setShowEnergyFx] = useState(false);
    const flashTimeoutRef = useRef<number | null>(null);
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const photoUrl = useMemo(() => {
        if (user?.profile_photo_url) return user.profile_photo_url;
        if (!user?.profile_photo_path) return null;
        return `/storage/${String(user.profile_photo_path).replace(/^\/+/, '')}`;
    }, [user?.profile_photo_path, user?.profile_photo_url]);

    const initials = useMemo(() => {
        const name = String(user?.name ?? 'U').trim();
        return name.charAt(0).toUpperCase();
    }, [user?.name]);

    const navItems = [
        { label: 'Dashboard', href: '/student/dashboard' },
        { label: 'Matérias', href: '/student/materias' },
        { label: 'Ranking', href: '/student/ranking' },
        { label: 'Amigos', href: '/student/amigos' },
    ];

    useEffect(() => {
        const profileEnergy = profile?.energy ?? 0;
        setDisplayEnergy((previous) => {
            if (previous === profileEnergy) return previous;

            setEnergyFlash(profileEnergy > previous ? 'up' : 'down');
            setShowEnergyFx(true);
            if (flashTimeoutRef.current) {
                window.clearTimeout(flashTimeoutRef.current);
            }
            flashTimeoutRef.current = window.setTimeout(() => {
                setEnergyFlash(null);
                setShowEnergyFx(false);
            }, 900);

            return profileEnergy;
        });
    }, [profile?.energy]);

    useEffect(() => {
        const onEnergyChanged = (event: Event) => {
            const detail = (event as CustomEvent<EnergyChangedDetail>).detail;
            const nextEnergy = Number(detail?.energy);
            if (Number.isNaN(nextEnergy)) return;

            setDisplayEnergy((previous) => {
                if (previous === nextEnergy) return previous;

                const direction =
                    detail?.delta && detail.delta !== 0
                        ? detail.delta > 0
                            ? 'up'
                            : 'down'
                        : nextEnergy > previous
                          ? 'up'
                          : 'down';

                setEnergyFlash(direction);
                setShowEnergyFx(true);
                if (flashTimeoutRef.current) {
                    window.clearTimeout(flashTimeoutRef.current);
                }
                flashTimeoutRef.current = window.setTimeout(() => {
                    setEnergyFlash(null);
                    setShowEnergyFx(false);
                }, 900);

                return nextEnergy;
            });
        };

        window.addEventListener(
            'edurush:energy-changed',
            onEnergyChanged as EventListener,
        );

        return () => {
            window.removeEventListener(
                'edurush:energy-changed',
                onEnergyChanged as EventListener,
            );
            if (flashTimeoutRef.current) {
                window.clearTimeout(flashTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#0A2A80_0%,#0D47C0_40%,#1565FF_100%)] p-3 sm:p-5">
            <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-[#E8F2FF] shadow-[0_25px_80px_rgba(5,16,44,0.35)] dark:border-[#23324D] dark:bg-[#0F172A]">
                <header className="sticky top-0 z-30 border-b border-[#BFE0FF] bg-white/92 px-4 py-3 backdrop-blur sm:px-6 dark:border-[#263753] dark:bg-[#0B1428]/95">
                    <div className="flex items-center gap-3">
                        <Link href="/student/dashboard" className="shrink-0">
                            <img
                                src={
                                    resolvedAppearance === 'dark'
                                        ? '/branding/edurush-dark.png'
                                        : '/branding/edurush-light.png'
                                }
                                alt="EduRush"
                                className="h-11 w-auto sm:h-12"
                            />
                        </Link>

                        <nav className="ml-1 hidden items-center gap-2 sm:flex">
                            {navItems.map((item) => {
                                const isActive = page.url.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'rounded-full px-4 py-2 text-sm font-bold transition',
                                            isActive
                                                ? 'bg-[#1565FF] text-white shadow-[0_8px_22px_rgba(21,101,255,0.35)]'
                                                : 'text-[#2F3E63] hover:bg-[#E8F2FF] dark:text-[#B4C3E3] dark:hover:bg-[#142645]',
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
                                        resolvedAppearance === 'dark'
                                            ? 'light'
                                            : 'dark',
                                    )
                                }
                                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#BFE0FF] bg-white text-[#1565FF] transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#EAF3FF] hover:shadow-md dark:border-[#263753] dark:bg-[#111C33] dark:text-[#B4C3E3] dark:hover:border-[#375786] dark:hover:bg-[#16233D]"
                                aria-label="Alternar tema"
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>

                            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFE0FF] bg-white px-3 py-1.5 dark:border-[#263753] dark:bg-[#111C33]">
                                <div className="relative h-4 w-4">
                                    <img
                                        src="/icons/energy.png"
                                        alt="Energia"
                                        className="h-4 w-4"
                                    />
                                    {showEnergyFx ? (
                                        <SafeLottie
                                            animationData={energyAnimation}
                                            loop={false}
                                            autoplay
                                            className="pointer-events-none absolute -left-3 -top-3 h-10 w-10"
                                        />
                                    ) : null}
                                </div>
                                <span
                                    className={cn(
                                        'text-sm font-black transition-all duration-300',
                                        energyFlash === 'up'
                                            ? '-translate-y-0.5 text-[#1E9E6A] dark:text-[#6EE7B7]'
                                            : energyFlash === 'down'
                                              ? 'translate-y-0.5 text-[#D92D4E] dark:text-[#FF9DB1]'
                                              : 'text-[#1565FF] dark:text-[#9CC0FF]',
                                    )}
                                >
                                    {displayEnergy}
                                </span>
                            </div>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpen((value) => !value)}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#BFE0FF] bg-white p-1 pr-3 transition hover:-translate-y-0.5 hover:border-[#93C5FF] hover:bg-[#F3F8FF] hover:shadow-md dark:border-[#263753] dark:bg-[#111C33] dark:hover:border-[#375786] dark:hover:bg-[#16233D]"
                                >
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt={user?.name ?? 'Perfil'}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F2FF] text-sm font-black text-[#1565FF] dark:bg-[#142645] dark:text-[#9CC0FF]">
                                            {initials}
                                        </span>
                                    )}
                                    <span className="hidden max-w-[130px] truncate text-sm font-bold text-[#2F3E63] sm:block dark:text-[#E7EEFF]">
                                        {user?.name ?? 'Usuário'}
                                    </span>
                                </button>

                                {open ? (
                                    <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-2xl border border-[#BFE0FF] bg-white p-3 shadow-xl dark:border-[#263753] dark:bg-[#111C33]">
                                        <div className="mb-3 rounded-xl bg-[#E8F2FF] p-3 dark:bg-[#0B1428]">
                                            <p className="text-sm font-black text-[#0F1A3B] dark:text-[#E7EEFF]">
                                                {user?.name ?? 'Usuário'}
                                            </p>
                                            <p className="truncate text-xs font-semibold text-[#5B6B93] dark:text-[#8EA1C7]">
                                                {user?.email ?? ''}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <Link
                                                href="/student/profile"
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

                <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
