'use client';

import { useEffect, useState } from 'react';
import { useTradeStore } from '@/app/store/tradeStore';
import { usePriceStore } from '@/app/store/priceStore';
import { mockAssets } from '@/app/utils/mockData';
import StatCard from '@/app/components/ui/StatCard';
import TradeModal from '@/app/components/ui/TradeModal';
import { formatPrice, formatPercent } from '@/app/utils/formatters';

export default function PortfolioPage() {
    const [mounted, setMounted] = useState(false);
    const [tradeModal, setTradeModal] = useState<{
        isOpen: boolean;
        symbol: string;
        price: number;
        type: 'buy' | 'sell';
    }>({
        isOpen: false,
        symbol: '',
        price: 0,
        type: 'sell',
    });
    const { balance, portfolio, tradeHistory, getTotalValue, getTotalPNL, getTotalPNLPercent } = useTradeStore();
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

    if (!mounted) {
        return (
            <div className="p-4 sm:p-6 space-y-6">
                <div>
                    <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-10 w-48 mb-2" />
                    <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-64" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array(4).fill(0).map((_, i) => (
                        <div key={`stat-${i}`} className="card">
                            <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-4 w-24 mb-2" />
                            <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-8 w-32" />
                        </div>
                    ))}
                </div>
                <div className="card">
                    <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-8 w-48 mb-6" />
                    <div className="w-full space-y-4">
                        <div className="flex justify-between border-b border-dark-border pb-4 w-full">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={`header1-${i}`} className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-6 w-20" />
                            ))}
                        </div>
                        {Array(3).fill(0).map((_, rowIndex) => (
                            <div key={`row1-${rowIndex}`} className="flex justify-between py-4 border-b border-dark-border/50">
                                {Array(6).fill(0).map((_, colIndex) => (
                                    <div key={`cell1-${rowIndex}-${colIndex}`} className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-5 w-20" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <div className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-8 w-48 mb-6" />
                    <div className="w-full space-y-4">
                        <div className="flex justify-between border-b border-dark-border pb-4 w-full">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={`header2-${i}`} className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-6 w-20" />
                            ))}
                        </div>
                        {Array(3).fill(0).map((_, rowIndex) => (
                            <div key={`row2-${rowIndex}`} className="flex justify-between py-4 border-b border-dark-border/50">
                                {Array(6).fill(0).map((_, colIndex) => (
                                    <div key={`cell2-${rowIndex}-${colIndex}`} className="animate-pulse bg-white/5 dark:bg-white/10 rounded-lg h-5 w-20" />
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
    const totalPNL = getTotalPNL(prices);
    const totalPNLPercent = getTotalPNLPercent(prices);
    const portfolioValue = totalValue - balance;

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-dark-text">Portfolio</h1>
                <p className="text-dark-text-secondary">View your holdings and trading history</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Value"
                    value={formatPrice(totalValue)}
                    icon="💎"
                />
                <StatCard
                    label="Cash Balance"
                    value={formatPrice(balance)}
                    icon="💰"
                />
                <StatCard
                    label="Holdings Value"
                    value={formatPrice(portfolioValue)}
                    icon="📊"
                />
                <StatCard
                    label="Total P&L"
                    value={formatPrice(totalPNL)}
                    change={totalPNLPercent}
                    icon="🎯"
                />
            </div>

            {/* Holdings */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark-text">Your Holdings</h2>
                {Object.keys(portfolio).length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-dark-text-secondary text-lg">No holdings yet</p>
                        <p className="text-dark-text-secondary mb-6">Start trading to build your portfolio</p>
                        <a href="/market" className="btn-primary inline-block">
                            Go to Market
                        </a>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Asset</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Quantity</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Avg Price</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Current Price</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Total Value</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">P&L</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(portfolio).map(([symbol, holding]) => {
                                    const currentPrice = prices[symbol] || (holding as any).currentPrice;
                                    const totalValue = (holding as any).quantity * currentPrice;
                                    const costBasis = (holding as any).quantity * (holding as any).averagePrice;
                                    const pnl = totalValue - costBasis;
                                    const pnlPercent = (pnl / costBasis) * 100;

                                    return (
                                        <tr key={symbol} className="border-b border-dark-border hover:bg-dark-surface-alt transition-colors">
                                            <td className="py-4 px-4 font-bold text-dark-text">{symbol}</td>
                                            <td className="text-right py-4 px-4 text-dark-text">{Number((holding as any).quantity || 0).toFixed(6)}</td>
                                            <td className="text-right py-4 px-4 text-dark-text">{formatPrice((holding as any).averagePrice)}</td>
                                            <td className="text-right py-4 px-4 text-dark-text">{formatPrice(currentPrice)}</td>
                                            <td className="text-right py-4 px-4 font-bold text-dark-text">{formatPrice(totalValue)}</td>
                                            <td className={`text-right py-4 px-4 font-bold ${pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                                                {pnl >= 0 ? '+' : ''}{formatPrice(pnl)} ({formatPercent(pnlPercent)})
                                            </td>
                                            <td className="text-right py-4 px-4">
                                                <button
                                                    onClick={() => setTradeModal({ isOpen: true, symbol, price: currentPrice, type: 'sell' })}
                                                    className="px-4 py-1.5 bg-danger hover:bg-red-700 text-white rounded text-sm font-medium transition-colors shadow-sm"
                                                >
                                                    Sell
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Trade History */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark-text">Trade History</h2>
                {tradeHistory.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-dark-text-secondary text-lg">No trades yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Time</th>
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Type</th>
                                    <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Asset</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Quantity</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Price</th>
                                    <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Total</th>
                                    {tradeHistory.some((t) => t.profitLoss) && (
                                        <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">P&L</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {tradeHistory.map((trade) => (
                                    <tr key={trade.id} className="border-b border-dark-border hover:bg-dark-surface-alt transition-colors">
                                        <td className="py-4 px-4 text-sm text-dark-text-secondary">
                                            {new Date(trade.timestamp).toLocaleString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${trade.type === 'buy' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                                                    }`}
                                            >
                                                {trade.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-bold text-dark-text">{trade.symbol}</td>
                                        <td className="text-right py-4 px-4 text-dark-text">{Number(trade.quantity || 0).toFixed(6)}</td>
                                        <td className="text-right py-4 px-4 text-dark-text">{formatPrice(trade.price)}</td>
                                        <td className="text-right py-4 px-4 font-bold text-dark-text">
                                            {formatPrice(trade.quantity * trade.price)}
                                        </td>
                                        {tradeHistory.some((t) => t.profitLoss) && (
                                            <td
                                                className={`text-right py-4 px-4 font-bold ${trade.profitLoss ? (trade.profitLoss >= 0 ? 'text-success' : 'text-danger') : ''
                                                    }`}
                                            >
                                                {trade.profitLoss ? formatPrice(trade.profitLoss) : '-'}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Trade Modal */}
            <TradeModal
                isOpen={tradeModal.isOpen}
                onClose={() => setTradeModal({ ...tradeModal, isOpen: false })}
                symbol={tradeModal.symbol}
                price={tradeModal.price}
                type={tradeModal.type}
            />
        </div>
    );
}
