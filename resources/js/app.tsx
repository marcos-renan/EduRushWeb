import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import StudentLayout from '@/layouts/student-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name === 'auth/login' || name === 'auth/register':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('student/'):
                return StudentLayout;
            case name.startsWith('admin/'):
                return AdminLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#111C33',
                            color: '#E7EEFF',
                            border: '1px solid #263753',
                            fontWeight: 700,
                        },
                        success: {
                            iconTheme: {
                                primary: '#1E9E6A',
                                secondary: '#E7EEFF',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#D92D4E',
                                secondary: '#E7EEFF',
                            },
                        },
                    }}
                />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
