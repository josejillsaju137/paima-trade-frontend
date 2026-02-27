'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (!isLoggedIn && typeof window !== 'undefined') {
            router.push('/auth/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return <div className="flex items-center justify-center h-screen">Redirecting...</div>;
    }

    return <>{children}</>;
}
