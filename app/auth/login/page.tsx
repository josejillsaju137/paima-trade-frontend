'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login(username, password);
            router.push('/dashboard');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-12">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-2xl">
                        📈
                    </div>
                    <span className="text-2xl font-bold text-primary">PaimaTrade</span>
                </Link>

                {/* Card */}
                <div className="card">
                    <h1 className="text-3xl font-bold mb-2 text-dark-text">Welcome Back</h1>
                    <p className="text-dark-text-secondary mb-8">Sign in to your account to continue trading</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-dark-text">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="YourUsername"
                                className="input"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-dark-text">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input"
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-danger/10 border border-danger rounded-lg p-3 text-danger text-sm">
                                {error}
                            </div>
                        )}

                        {/* Forgot password link */}
                        <div className="text-right">
                            <Link href="/auth/forgot-password" className="text-primary hover:text-primary-dark text-sm">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="btn-primary w-full">
                            Sign In
                        </button>
                    </form>

                    {/* Sign up link */}
                    <div className="mt-6 pt-6 border-t border-dark-border text-center">
                        <p className="text-dark-text-secondary mb-2">Don't have an account?</p>
                        <Link href="/auth/register" className="text-primary hover:text-primary-dark font-medium">
                            Create one now
                        </Link>
                    </div>
                </div>

                {/* Demo credentials */}
                <div className="mt-8 p-4 bg-dark-surface rounded-lg border border-dark-border">
                    <p className="text-xs text-dark-text-secondary mb-3">
                        <strong>Demo Account (for testing):</strong>
                    </p>
                    <div className="space-y-1 text-xs font-mono text-dark-text bg-dark-surface-alt p-3 rounded border border-dark-border">
                        <p>Username: demo_user</p>
                        <p>Password: (any password works during testing)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
