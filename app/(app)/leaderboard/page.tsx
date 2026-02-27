'use client';

import { useEffect, useState } from 'react';
import { useTradeStore } from '@/app/store/tradeStore';
import { usePriceStore } from '@/app/store/priceStore';
import { mockAssets, mockLeaderboard, currentUserLeaderboard } from '@/app/utils/mockData';
import { formatPrice, formatPercent } from '@/app/utils/formatters';

export default function LeaderboardPage() {
    const [mounted, setMounted] = useState(false);
    const { balance, portfolio, getTotalValue, getTotalPNLPercent } = useTradeStore();
    const { assets, setAssets } = usePriceStore();

    // Initialize prices
    useEffect(() => {
        const initialAssets = mockAssets.reduce((acc, asset) => {
            acc[asset.symbol] = asset;
            return acc;
        }, {} as Record<string, any>);
        setAssets(initialAssets);
        setMounted(true);
    }, [setAssets]);

    if (!mounted) return <div className="p-6 text-center">Loading...</div>;

    const prices = Object.fromEntries(Object.entries(assets).map(([symbol, asset]) => [symbol, (asset as any).price]));
    const totalValue = getTotalValue(prices);
    const totalPNLPercent = getTotalPNLPercent(prices);

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-dark-text">Leaderboard</h1>
                <p className="text-dark-text-secondary">Weekly rankings - Top traders by return %</p>
            </div>

            {/* Your Stats */}
            <div className="card bg-primary/10 border border-primary">
                <div className="grid md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-dark-text-secondary mb-1">Your Rank</p>
                        <p className="text-3xl font-bold text-primary">#{currentUserLeaderboard.rank}</p>
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
                <h2 className="text-2xl font-bold mb-6 text-dark-text">🏆 Top Traders This Week</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-dark-border">
                                <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Rank</th>
                                <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Trader</th>
                                <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Profit</th>
                                <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Return %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLeaderboard.map((trader) => {
                                const isCurrentUser = trader.rank === currentUserLeaderboard.rank;
                                return (
                                    <tr
                                        key={trader.rank}
                                        className={`border-b border-dark-border transition-colors ${isCurrentUser ? 'bg-primary/20 hover:bg-primary/30' : 'hover:bg-dark-surface-alt'
                                            }`}
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
                                            {trader.profit}
                                        </td>
                                        <td className="text-right py-4 px-4 font-bold text-success">
                                            {trader.profitPercent}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
