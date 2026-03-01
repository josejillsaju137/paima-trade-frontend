'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuthStore();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(formData.username, formData.password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
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
                    <h1 className="text-3xl font-bold mb-2 text-dark-text">Create Account</h1>
                    <p className="text-dark-text-secondary mb-8">Join thousands of traders learning with PaimaTrade</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-dark-text">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="YourUsername"
                                className="input"
                            />
                            <p className="text-xs text-dark-text-secondary mt-1">This will appear on the leaderboard</p>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-dark-text">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="input"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-dark-text">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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

                        {/* Terms agreement */}
                        <div className="bg-dark-surface-alt p-4 rounded-lg text-sm text-dark-text-secondary">
                            <p>
                                By creating an account, you agree to our{' '}
                                <Link href="/terms" className="text-primary hover:text-primary-dark">
                                    Terms & Disclaimer
                                </Link>
                                . This is for educational purposes only.
                            </p>
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="btn-primary w-full">
                            Create Account
                        </button>
                    </form>

                    {/* Login link */}
                    <div className="mt-6 pt-6 border-t border-dark-border text-center">
                        <p className="text-dark-text-secondary mb-2">Already have an account?</p>
                        <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
