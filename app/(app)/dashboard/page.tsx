'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/app/components/ui/StatCard';
import { useTradeStore } from '@/app/store/tradeStore';
import { usePriceStore } from '@/app/store/priceStore';
import { mockAssets } from '@/app/utils/mockData';
import { formatPrice, formatPercent } from '@/app/utils/formatters';

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);
    const { balance, portfolio, getTotalValue, getTotalPNL, getTotalPNLPercent } = useTradeStore();
    const { assets, setAssets } = usePriceStore();

    // Initialize prices from mock data
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
    const totalPNL = getTotalPNL(prices);
    const totalPNLPercent = getTotalPNLPercent(prices);
    const portfolioValue = totalValue - balance;

    const topMovers = Object.entries(assets)
        .sort((a, b) => Math.abs((b[1] as any).changePercent24h) - Math.abs((a[1] as any).changePercent24h))
        .slice(0, 5);

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-dark-text">Dashboard</h1>
                <p className="text-dark-text-secondary">Welcome back! Here's your trading overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Balance"
                    value={formatPrice(balance)}
                    icon="💰"
                />
                <StatCard
                    label="Portfolio Value"
                    value={formatPrice(portfolioValue)}
                    icon="📈"
                />
                <StatCard
                    label="Total P&L"
                    value={formatPrice(totalPNL)}
                    change={totalPNLPercent}
                    icon="🎯"
                />
                <StatCard
                    label="Total Value"
                    value={formatPrice(totalValue)}
                    icon="💎"
                />
            </div>

            {/* Portfolio Section */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Holdings */}
                <div className="lg:col-span-2 card">
                    <h2 className="text-2xl font-bold mb-4 text-dark-text">Your Holdings</h2>
                    {Object.keys(portfolio).length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-dark-text-secondary text-lg mb-4">No holdings yet</p>
                            <p className="text-dark-text-secondary">Start trading to see your portfolio here</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(portfolio).map(([symbol, holding]) => {
                                const currentPrice = prices[symbol] || (holding as any).currentPrice;
                                const totalValue = (holding as any).quantity * currentPrice;
                                const costBasis = (holding as any).quantity * (holding as any).averagePrice;
                                const pnl = totalValue - costBasis;
                                const pnlPercent = (pnl / costBasis) * 100;

                                return (
                                    <div key={symbol} className="p-4 bg-dark-surface-alt rounded-lg border border-dark-border">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-dark-text">{symbol}</h3>
                                                <p className="text-sm text-dark-text-secondary">
                                                    {(holding as any).quantity.toFixed(4)} @ {formatPrice(currentPrice)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-dark-text">{formatPrice(totalValue)}</p>
                                                <p className={`text-sm ${pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                                                    {pnl >= 0 ? '+' : ''}{formatPrice(pnl)} ({formatPercent(pnlPercent)})
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Top Movers */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4 text-dark-text">Top Movers</h2>
                    <div className="space-y-3">
                        {topMovers.map(([symbol, asset]) => (
                            <div key={symbol} className="p-3 bg-dark-surface-alt rounded-lg border border-dark-border">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-dark-text">{symbol}</span>
                                    <span className={`text-sm font-bold ${(asset as any).changePercent24h >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {(asset as any).changePercent24h >= 0 ? '+' : ''}{formatPercent((asset as any).changePercent24h)}
                                    </span>
                                </div>
                                <p className="text-xs text-dark-text-secondary">{formatPrice((asset as any).price)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-dark-text">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <a href="/market" className="btn-primary text-center">📈 Buy</a>
                    <a href="/market" className="btn-secondary text-center">📉 Sell</a>
                    <a href="/portfolio" className="btn-secondary text-center">📊 Portfolio</a>
                    <a href="/leaderboard" className="btn-secondary text-center">🏆 Leaderboard</a>
                </div>
            </div>
        </div>
    );
}
