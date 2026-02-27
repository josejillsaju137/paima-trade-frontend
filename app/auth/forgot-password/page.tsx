'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setEmail('');
        }, 3000);
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
                    {!submitted ? (
                        <>
                            <h1 className="text-3xl font-bold mb-2 text-dark-text">Reset Password</h1>
                            <p className="text-dark-text-secondary mb-8">
                                Enter your email address and we'll send you a password reset link.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-dark-text">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="input"
                                        required
                                    />
                                </div>

                                {/* Submit button */}
                                <button type="submit" className="btn-primary w-full">
                                    Send Reset Link
                                </button>
                            </form>

                            {/* Back to login */}
                            <div className="mt-6 pt-6 border-t border-dark-border text-center">
                                <p className="text-dark-text-secondary mb-2">Remember your password?</p>
                                <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold mb-2 text-success">Email Sent!</h2>
                            <p className="text-dark-text-secondary mb-6">
                                Check your email for password reset instructions.
                            </p>
                            <p className="text-sm text-dark-text-secondary mb-8">
                                (This is a demo - no email is actually sent)
                            </p>
                            <Link href="/auth/login" className="btn-primary">
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Demo note */}
                <div className="mt-8 p-4 bg-dark-surface rounded-lg border border-dark-border text-center text-xs text-dark-text-secondary">
                    <p>This is a demo. For testing, use the credentials in the login page.</p>
                </div>
            </div>
        </div>
    );
}
