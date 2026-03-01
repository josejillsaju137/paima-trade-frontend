'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import { useTradeStore } from '@/app/store/tradeStore';
import { formatPrice } from '@/app/utils/formatters';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
    const [mounted, setMounted] = useState(false);
    const { user, logout } = useAuthStore();
    const { balance, resetAll } = useTradeStore();
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleReset = () => {
        resetAll();
        setShowResetConfirm(false);
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    if (!mounted) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-dark-text">Settings</h1>
                <p className="text-dark-text-secondary">Manage your account and preferences</p>
            </div>

            {/* Account Info */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark-text">Account Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-6 border-b border-dark-border">
                        <img
                            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                            alt={user?.username}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <p className="text-sm text-dark-text-secondary mb-1">Username</p>
                            <p className="text-2xl font-bold text-dark-text">{user?.username}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-dark-text-secondary mb-2">Username Alias</p>
                        <p className="text-lg text-dark-text">@{user?.username}</p>
                    </div>

                    <div>
                        <p className="text-sm text-dark-text-secondary mb-2">Current Balance</p>
                        <p className="text-lg font-bold text-dark-text">{formatPrice(balance)}</p>
                    </div>
                </div>
            </div>

            {/* Account Actions */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark-text">Account Actions</h2>
                <div className="space-y-3">
                    {/* Reset Account */}
                    {!showResetConfirm ? (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full btn-danger text-left"
                        >
                            🔄 Reset Trading Account
                        </button>
                    ) : (
                        <div className="border border-danger rounded-lg p-4 bg-danger/10 space-y-3">
                            <p className="text-dark-text font-bold">Are you sure? This will:</p>
                            <ul className="space-y-1 text-dark-text-secondary text-sm ml-4">
                                <li>• Reset your balance to $10,000</li>
                                <li>• Clear all your holdings</li>
                                <li>• Delete your trade history</li>
                                <li>• Reset your leaderboard rank</li>
                            </ul>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex-1 px-4 py-2 bg-danger hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Confirm Reset
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full btn-secondary"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Preferences */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark-text">Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-surface-alt rounded-lg">
                        <div>
                            <p className="font-medium text-dark-text">Dark Theme</p>
                            <p className="text-sm text-dark-text-secondary">Toggle between light and dark modes</p>
                        </div>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`w-12 h-6 rounded-full transition-colors flex items-center ${theme === 'dark' ? 'bg-primary justify-end pr-1' : 'bg-gray-300 justify-start pl-1'}`}
                            aria-label="Toggle dark theme"
                        >
                            <div className="w-5 h-5 bg-white rounded-full shadow-md" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Help */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark-text">Help & Information</h2>
                <div className="space-y-3">
                    <a href="/about" className="block p-4 bg-dark-surface-alt hover:bg-dark-surface hover:border-primary border border-dark-border rounded-lg transition-colors">
                        <p className="font-bold text-dark-text">About PaimaTrade</p>
                        <p className="text-sm text-dark-text-secondary">Learn about our platform</p>
                    </a>
                    <a href="/how-it-works" className="block p-4 bg-dark-surface-alt hover:bg-dark-surface hover:border-primary border border-dark-border rounded-lg transition-colors">
                        <p className="font-bold text-dark-text">How It Works</p>
                        <p className="text-sm text-dark-text-secondary">Guide to using PaimaTrade</p>
                    </a>
                    <a href="/terms" className="block p-4 bg-dark-surface-alt hover:bg-dark-surface hover:border-primary border border-dark-border rounded-lg transition-colors">
                        <p className="font-bold text-dark-text">Terms & Disclaimer</p>
                        <p className="text-sm text-dark-text-secondary">Important legal information</p>
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center p-6 bg-dark-surface-alt rounded-lg border border-dark-border">
                <p className="text-sm text-dark-text-secondary mb-2">PaimaTrade v1.0.0</p>
                <p className="text-xs text-dark-text-secondary">
                    For educational purposes only. Not financial advice.
                </p>
            </div>
        </div>
    );
}
