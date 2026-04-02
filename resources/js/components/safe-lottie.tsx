import { useEffect, useRef } from 'react';

type Props = {
    animationData: object | null;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
};

export default function SafeLottie({
    animationData,
    className,
    loop = false,
    autoplay = true,
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!animationData || !containerRef.current) return;

        let cancelled = false;
        let animationInstance: { destroy?: () => void } | null = null;

        void import('lottie-web/build/player/lottie_light').then((module) => {
            if (cancelled || !containerRef.current || !animationData) return;

            const lottie = (
                module as unknown as {
                    default?: {
                        loadAnimation: (
                            params: Record<string, unknown>,
                        ) => { destroy?: () => void };
                    };
                }
            ).default;

            if (!lottie?.loadAnimation) return;

            animationInstance = lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop,
                autoplay,
                animationData,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid meet',
                },
            });
        });

        return () => {
            cancelled = true;
            animationInstance?.destroy?.();
        };
    }, [animationData, autoplay, loop]);

    return <div ref={containerRef} className={className} aria-hidden />;
}

