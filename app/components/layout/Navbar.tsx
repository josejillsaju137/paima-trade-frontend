'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import { useUIStore } from '@/app/store/uiStore';
import { ThemeToggle } from '@/app/components/ui/ThemeToggle';

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuthStore();
    const { toggleSidebar } = useUIStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load user from localStorage if available
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    useAuthStore.setState({ isLoggedIn: true, user: parsedUser });
                } catch (e) {
                    console.error('Failed to load user from localStorage');
                }
            }
        }
    }, []);

    if (!mounted) return null;

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-dark-surface border-b border-dark-border sticky top-0 z-40">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                {/* Left side - Logo */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-dark-surface-alt rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            📈
                        </div>
                        <span className="hidden sm:inline">PaimaTrade</span>
                    </Link>
                </div>

                {/* Right side - User menu and Theme Toggle */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {isLoggedIn && user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="text-right">
                                    <div className="text-sm font-medium text-dark-text">{user.username}</div>
                                    <div className="text-xs text-dark-text-secondary">{user.email}</div>
                                </div>
                            </div>
                            <img
                                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                alt={user.username}
                                className="w-8 h-8 rounded-full"
                            />
                            <button
                                onClick={handleLogout}
                                className="btn-secondary text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/auth/login" className="btn-secondary text-sm">
                                Login
                            </Link>
                            <Link href="/auth/register" className="btn-primary text-sm">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
