'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/app/store/uiStore';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect, useState } from 'react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/market', label: 'Market', icon: '📈' },
    { href: '/portfolio', label: 'Portfolio', icon: '💼' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen } = useUIStore();
    const { isLoggedIn } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [pathname, setSidebarOpen]);

    // Handle window resize edge cases without trapping the toggle state
    useEffect(() => {
        const handleResize = () => {
            const state = useUIStore.getState();
            // If the user closed the sidebar on desktop, but resizes the window down to mobile, 
            // forcefully reset to closed so the w-0 class doesn't conflict with the mobile overlay
            if (window.innerWidth < 768 && !state.sidebarOpen) {
                state.setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return null;

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:relative h-screen bg-dark-surface border-dark-border
          transition-all duration-300 z-40 overflow-hidden shrink-0
          ${sidebarOpen
                        ? 'w-64 translate-x-0 border-r'
                        : 'w-64 -translate-x-full md:w-0 md:translate-x-0 md:border-r-0'}
        `}
            >
                <div className="w-64 p-6 space-y-8 h-[calc(100vh-64px)] overflow-y-auto w-[16rem]">
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden float-right p-2 hover:bg-dark-surface-alt rounded-lg"
                    >
                        ✕
                    </button>

                    {/* Navigation */}
                    <nav className="space-y-2 mt-8 md:mt-0">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-dark-text hover:bg-dark-surface-alt'
                                        }
                  `}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Divider */}
                    <div className="h-px bg-dark-border" />

                    {/* Settings section */}
                    <nav className="space-y-2">
                        <Link
                            href="/settings"
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${pathname === '/settings'
                                    ? 'bg-primary text-white'
                                    : 'text-dark-text hover:bg-dark-surface-alt'
                                }
              `}
                        >
                            <span className="text-xl">⚙️</span>
                            <span className="font-medium">Settings</span>
                        </Link>
                        <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-text hover:bg-dark-surface-alt transition-colors"
                        >
                            <span className="text-xl">📋</span>
                            <span className="font-medium">Terms</span>
                        </a>
                    </nav>

                    {/* Disclaimer */}
                    <div className="p-4 bg-dark-surface-alt border border-warning/30 rounded-lg">
                        <p className="text-xs text-dark-text-secondary">
                            ⚠️ <strong>Trading is risky.</strong> This is a virtual trading platform for educational purposes only. Do not invest real money based on this app.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}
