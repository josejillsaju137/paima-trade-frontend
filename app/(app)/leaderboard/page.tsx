'use client';

import { useEffect, useState } from 'react';
import { useTradeStore } from '@/app/store/tradeStore';
import { usePriceStore } from '@/app/store/priceStore';
import { useAuthStore } from '@/app/store/authStore';
import { formatPrice, formatPercent } from '@/app/utils/formatters';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://paima-trade-backend-production.up.railway.app';

export default function LeaderboardPage() {
    const [mounted, setMounted] = useState(false);
    const { balance, getTotalValue, getTotalPNLPercent } = useTradeStore();
    const { assets } = usePriceStore();
    const { user } = useAuthStore();

    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(`${API_URL}/api/leaderboard`);
            if (res.ok) {
                const data = await res.json();

                // Ensure ranking by value, descending
                const rankedData = Array.isArray(data) ? data.sort((a, b) => {
                    const aVal = a.net_worth || a.portfolioValue || 0;
                    const bVal = b.net_worth || b.portfolioValue || 0;
                    return bVal - aVal;
                }) : [];

                // Add pseudo rank properties if missing
                rankedData.forEach((trader, index) => {
                    trader.rank = index + 1;
                    // Mock profits if backend only sends net worths (assuming 1M default)
                    const worth = trader.net_worth || trader.portfolioValue || 100000;
                    trader.profit = worth - 100000;
                    trader.profitPercent = (trader.profit / 100000) * 100;
                    trader.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${trader.username}`;
                });

                setLeaderboard(rankedData);
            }
        } catch (err) {
            console.error('Failed to fetch leaderboard:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) {
        return (
            <div className="p-4 sm:p-6 space-y-6">
                <div>
                    <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-10 w-48 mb-2" />
                    <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-64" />
                </div>
                <div className="card bg-primary/5 border border-primary/20">
                    <div className="grid md:grid-cols-4 gap-6">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={`stat-${i}`}>
                                <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-24 mb-2" />
                                <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-8 w-32" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-8 w-64" />
                        <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-8 w-24" />
                    </div>
                    {/* Skeleton Table Rows */}
                    <div className="w-full space-y-4">
                        <div className="flex justify-between border-b border-dark-border pb-4 w-full">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={`header-${i}`} className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-6 w-20" />
                            ))}
                        </div>
                        {Array(5).fill(0).map((_, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="flex justify-between py-4 border-b border-dark-border/50">
                                {Array(4).fill(0).map((_, colIndex) => (
                                    <div key={`cell-${rowIndex}-${colIndex}`} className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-5 w-20" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const prices = Object.fromEntries(Object.entries(assets).map(([symbol, asset]) => [symbol, (asset as any).price]));
    const totalValue = getTotalValue(prices);
    const totalPNLPercent = getTotalPNLPercent(prices);

    const myRank = leaderboard.findIndex(t => t.username === user?.username) + 1 || '-';

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-dark-text">Leaderboard</h1>
                <p className="text-dark-text-secondary">Weekly rankings - Top traders by portfolio valuation</p>
            </div>

            {/* Your Stats */}
            <div className="card bg-primary/10 border border-primary">
                <div className="grid md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-dark-text-secondary mb-1">Your Rank</p>
                        <p className="text-3xl font-bold text-primary">#{myRank}</p>
                    </div>
                    <div>
                        <p className="text-sm text-dark-text-secondary mb-1">Portfolio Value</p>
                        <p className="text-3xl font-bold text-dark-text">{formatPrice(totalValue)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-dark-text-secondary mb-1">Total P&L</p>
                        <p className={`text-3xl font-bold ${totalPNLPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                            {totalPNLPercent >= 0 ? '+' : ''}{formatPercent(totalPNLPercent)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-dark-text-secondary mb-1">Cash Balance</p>
                        <p className="text-3xl font-bold text-dark-text">{formatPrice(balance)}</p>
                    </div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark-text">🏆 Top Traders This Week</h2>
                    <button onClick={fetchLeaderboard} className="btn-secondary text-sm">
                        🔄 Refresh
                    </button>
                </div>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Rank</th>
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Trader</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Valuation</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Return %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(5).fill(0).map((_, index) => (
                                    <tr key={index} className="border-b border-dark-border">
                                        <td className="py-4 px-4"><div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-full h-8 w-8" /></td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-full h-8 w-8" />
                                                <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-24" />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 flex justify-end"><div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-20" /></td>
                                        <td className="py-4 px-4 flex justify-end"><div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-16" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : leaderboard.length === 0 ? (
                        <div className="p-8 text-center text-dark-text-secondary">No traders found on the leaderboard.</div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Rank</th>
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Trader</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Valuation</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Return %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((trader) => {
                                    const isCurrentUser = trader.username === user?.username;
                                    return (
                                        <tr
                                            key={trader.username}
                                            className={`border-b border-dark-border transition-colors ${isCurrentUser ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-dark-surface-alt'}`}
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                                        {trader.rank}
                                                    </span>
                                                    {trader.rank === 1 && <span className="text-xl">🥇</span>}
                                                    {trader.rank === 2 && <span className="text-xl">🥈</span>}
                                                    {trader.rank === 3 && <span className="text-xl">🥉</span>}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={trader.avatar}
                                                        alt={trader.username}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div>
                                                        <p className={`font-bold ${isCurrentUser ? 'text-primary' : 'text-dark-text'}`}>
                                                            {trader.username}
                                                        </p>
                                                        {isCurrentUser && (
                                                            <p className="text-xs text-primary font-bold">You</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-right py-4 px-4 font-bold text-success">
                                                {formatPrice(trader.net_worth || trader.portfolioValue || 100000)}
                                            </td>
                                            <td className="text-right py-4 px-4 font-bold text-success">
                                                +{formatPercent(trader.profitPercent || 0)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Info section */}
            <div className="card bg-dark-surface-alt border border-dark-border">
                <h3 className="font-bold text-dark-text mb-3">📊 How the Leaderboard Works</h3>
                <ul className="space-y-2 text-dark-text-secondary">
                    <li className="flex gap-3">
                        <span>•</span>
                        <span><strong>Weekly Ranking:</strong> Traders are ranked by their return percentage</span>
                    </li>
                    <li className="flex gap-3">
                        <span>•</span>
                        <span><strong>Return %:</strong> Calculated as (Profit / Initial Investment) × 100</span>
                    </li>
                    <li className="flex gap-3">
                        <span>•</span>
                        <span><strong>Reset:</strong> Leaderboard resets every Monday at 00:00 UTC</span>
                    </li>
                    <li className="flex gap-3">
                        <span>•</span>
                        <span><strong>Competition:</strong> Compete globally with all other traders</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
