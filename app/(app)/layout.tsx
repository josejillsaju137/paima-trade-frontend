'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isLoggedIn, isInitializing } = useAuthStore();

    useEffect(() => {
        if (!isInitializing && !isLoggedIn && typeof window !== 'undefined') {
            router.push('/auth/login');
        }
    }, [isLoggedIn, isInitializing, router]);

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center h-screen bg-dark-bg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
}
