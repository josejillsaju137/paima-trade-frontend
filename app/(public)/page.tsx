'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard');
        }
    }, [isLoggedIn, router]);

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Navbar */}
            <nav className="border-b border-dark-border sticky top-0 z-40 bg-dark-bg/80 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            📈
                        </div>
                        PaimaTrade
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="btn-secondary">
                            Login
                        </Link>
                        <Link href="/auth/register" className="btn-primary">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark-text">
                        Master Trading with <span className="text-primary">PaimaTrade</span>
                    </h1>
                    <p className="text-xl text-dark-text-secondary mb-8 max-w-2xl mx-auto">
                        Learn to trade cryptocurrency and virtual assets without risking real money. Get 10,00,000 virtual rupees to start trading immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/register" className="btn-primary px-8 py-4 text-lg">
                            🚀 Start Trading Free
                        </Link>
                        <Link href="#features" className="btn-secondary px-8 py-4 text-lg">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features section */}
            <section id="features" className="py-20 px-4 bg-dark-surface border-y border-dark-border">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-dark-text">
                        Why Choose PaimaTrade?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '💰',
                                title: '₹10,00,000 Virtual Balance',
                                description: 'Start with virtual funds to practice trading without any real money at stake.',
                            },
                            {
                                icon: '📊',
                                title: '8 Cryptocurrencies',
                                description: 'Trade Bitcoin, Ethereum, Ripple, Solana, Cardano, Dogecoin, and more.',
                            },
                            {
                                icon: '📈',
                                title: 'Real-Time Price Updates',
                                description: 'Watch prices update in real-time with realistic market simulations.',
                            },
                            {
                                icon: '🏆',
                                title: 'Global Leaderboard',
                                description: 'Compete with other traders and see your rank on the weekly leaderboard.',
                            },
                            {
                                icon: '📋',
                                title: 'Portfolio Tracking',
                                description: 'Track all your holdings and see detailed profit/loss calculations.',
                            },
                            {
                                icon: '🎯',
                                title: 'Trade History',
                                description: 'Review all your trades and analyze your trading performance.',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="card">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-dark-text">{feature.title}</h3>
                                <p className="text-dark-text-secondary">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-dark-text">
                        How It Works
                    </h2>

                    <div className="space-y-8">
                        {[
                            {
                                step: '1',
                                title: 'Create Account',
                                description: 'Sign up in seconds and get ₹10,00,000 in virtual trading funds.',
                            },
                            {
                                step: '2',
                                title: 'Browse Markets',
                                description: 'Explore 8 different cryptocurrencies with real-time price data.',
                            },
                            {
                                step: '3',
                                title: 'Place Trades',
                                description: 'Buy and sell assets using your virtual balance. Learn without risk.',
                            },
                            {
                                step: '4',
                                title: 'Track Portfolio',
                                description: 'Monitor your holdings, P&L, and performance over time.',
                            },
                            {
                                step: '5',
                                title: 'Compete',
                                description: 'Climb the leaderboard and see how you rank against other traders.',
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-dark-text mb-2">{item.title}</h3>
                                    <p className="text-dark-text-secondary">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leaderboard preview */}
            <section id="leaderboard" className="py-20 px-4 bg-dark-surface border-y border-dark-border">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-dark-text">
                        Weekly Leaderboard
                    </h2>

                    <div className="card">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left py-4 px-4 font-bold text-dark-text">Rank</th>
                                    <th className="text-left py-4 px-4 font-bold text-dark-text">Trader</th>
                                    <th className="text-right py-4 px-4 font-bold text-dark-text">Profit</th>
                                    <th className="text-right py-4 px-4 font-bold text-dark-text">Return %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { rank: 1, name: 'CryptoKing', profit: '+₹8,245', return: '+82.45%' },
                                    { rank: 2, name: 'TradeMaster', profit: '+₹6,128', return: '+61.28%' },
                                    { rank: 3, name: 'BlockchainBob', profit: '+₹4,567', return: '+45.67%' },
                                    { rank: 4, name: 'ETHEnthusiast', profit: '+₹3,890', return: '+38.90%' },
                                    { rank: 5, name: 'BitcoinBabe', profit: '+₹3,245', return: '+32.45%' },
                                ].map((trader) => (
                                    <tr key={trader.rank} className="border-b border-dark-border hover:bg-dark-surface-alt transition-colors">
                                        <td className="py-4 px-4 font-bold text-primary text-lg">#{trader.rank}</td>
                                        <td className="py-4 px-4 font-semibold text-dark-text">{trader.name}</td>
                                        <td className="text-right py-4 px-4 font-semibold text-success">{trader.profit}</td>
                                        <td className="text-right py-4 px-4 font-semibold text-success">{trader.return}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/auth/register" className="btn-primary px-8 py-4">
                            Join the Leaderboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-dark-text">
                        Ready to Start Trading?
                    </h2>
                    <p className="text-xl text-dark-text-secondary mb-8">
                        Join thousands of traders learning with PaimaTrade today.
                    </p>
                    <Link href="/auth/register" className="btn-primary px-8 py-4 text-lg inline-block">
                        🚀 Get Started Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-dark-border py-12 px-4 bg-dark-surface">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-dark-text">PaimaTrade</h3>
                        <p className="text-dark-text-secondary">Virtual trading platform for learning.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4 text-dark-text">Platform</h3>
                        <ul className="space-y-2 text-dark-text-secondary">
                            <li><Link href="#" className="hover:text-primary transition-colors">Dashboard</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Market</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Portfolio</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4 text-dark-text">Resources</h3>
                        <ul className="space-y-2 text-dark-text-secondary">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4 text-dark-text">Legal</h3>
                        <ul className="space-y-2 text-dark-text-secondary">
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-dark-border pt-8 text-center text-dark-text-secondary">
                    <p>&copy; 2025 PaimaTrade. For educational purposes only. Not real financial advice.</p>
                </div>
            </footer>
        </div>
    );
}
