'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { usePriceStore } from '@/app/store/priceStore';
import { mockAssets } from '@/app/utils/mockData';
import { formatPrice, formatPercent, getChangeColor, getChangeBgColor } from '@/app/utils/formatters';
import CandlestickChart from '@/app/components/ui/CandlestickChart';
import TradeModal from '@/app/components/ui/TradeModal';
import { ArrowLeft, TrendingUp, DollarSign, Activity, BarChart2, Wifi, WifiOff } from 'lucide-react';
import { useLiveChartData } from '@/app/hooks/useLiveChartData';

export default function AssetDetailsPage({ params }: { params: Promise<{ symbol: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // Trade Modal State
    const [tradeModal, setTradeModal] = useState<{
        isOpen: boolean;
        type: 'buy' | 'sell';
    }>({
        isOpen: false,
        type: 'buy',
    });

    const { assets, setAssets } = usePriceStore();

    const symbol = resolvedParams.symbol.toUpperCase();
    const currentAsset = assets[symbol];

    // Connect to external live feed for specific indices (e.g., NIFTY50)
    // For local mock crypto assets, this hook will gracefully fail or return empty arrays, 
    // and the chart will fallback to its internal mock generator via the basePrice prop.
    const { data: liveData, isLoading: isLiveLoading, error: liveError } = useLiveChartData(symbol);

    // Initialization and Price Fluctuation (Mirroring Market logic)
    useEffect(() => {
        if (!currentAsset && mockAssets) {
            const initialAssets = mockAssets.reduce((acc, asset) => {
                acc[asset.symbol] = asset;
                return acc;
            }, {} as Record<string, any>);
            setAssets(initialAssets);
        }
        setMounted(true);

        const interval = setInterval(() => {
            const currentStoreAssets = usePriceStore.getState().assets;
            const updated = { ...currentStoreAssets };

            Object.entries(updated).forEach(([sym, asset]) => {
                const randomChange = (Math.random() - 0.5) * 4; // -2% to +2%
                const originalAsset = mockAssets.find((a) => a.symbol === sym)!;
                if (!originalAsset) return;

                const newPrice = asset.price * (1 + randomChange / 100);
                const change24h = newPrice - originalAsset.price;
                const changePercent24h = (change24h / originalAsset.price) * 100;

                updated[sym] = {
                    ...asset,
                    price: newPrice,
                    change24h,
                    changePercent24h
                };
            });

            setAssets(updated);
        }, 5000);

        return () => clearInterval(interval);
    }, [setAssets, currentAsset]);

    if (!mounted) return <div className="p-6 text-center text-dark-text">Loading Asset Data...</div>;

    // We allow rendering even without currentAsset to support purely external real-time feeds like 'NIFTY50'
    const displayPrice = currentAsset?.price || (liveData.length > 0 ? liveData[liveData.length - 1].close : 0);
    const displayName = currentAsset?.name || symbol;
    const displayChangePercent = currentAsset?.changePercent24h || 0;

    // Dummy Stats Generation
    const marketCap = currentAsset.price * 19000000; // Fake supply math
    const volume24h = marketCap * 0.05;

    return (
        <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
            {/* Navigation and Actions Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-dark-text-secondary hover:text-primary transition-colors gap-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Market
                </button>

                <div className="flex gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setTradeModal({ isOpen: true, type: 'buy' })}
                        className="flex-1 sm:flex-none px-6 py-2 bg-success hover:bg-green-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-success/20"
                    >
                        Buy {symbol}
                    </button>
                    <button
                        onClick={() => setTradeModal({ isOpen: true, type: 'sell' })}
                        className="flex-1 sm:flex-none px-6 py-2 bg-danger hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-danger/20"
                    >
                        Sell {symbol}
                    </button>
                </div>
            </div>

            {/* Asset Header Info */}
            <div className="card flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-br from-dark-surface to-dark-surface-alt">
                <div>
                    <div className="flex items-end gap-3 mb-2">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-text tracking-tight">{displayName}</h1>
                        <span className="text-2xl font-medium text-dark-text-secondary mb-1">{symbol}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-4xl font-bold font-mono text-dark-text tracking-tight">
                            {formatPrice(displayPrice)}
                        </span>
                        {displayChangePercent !== 0 && (
                            <div className={`px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 ${getChangeBgColor(displayChangePercent)}`}>
                                <TrendingUp className={`w-4 h-4 ${displayChangePercent < 0 ? 'rotate-180' : ''}`} />
                                {formatPercent(displayChangePercent)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Live Connection Status Badge */}
                <div className="flex flex-col items-end gap-2">
                    {liveData.length > 0 && !liveError ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-bold">
                            <Wifi className="w-4 h-4 animate-pulse" />
                            LIVE FEED
                        </div>
                    ) : liveError ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-danger/10 text-danger rounded-full text-sm font-bold" title={liveError}>
                            <WifiOff className="w-4 h-4" />
                            FEED DISCONNECTED
                        </div>
                    ) : isLiveLoading ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning rounded-full text-sm font-bold">
                            <Activity className="w-4 h-4 animate-pulse" />
                            CONNECTING...
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Advanced Chart System Implementation */}
            <div className="card min-h-[500px] border-dark-border/50">
                <CandlestickChart
                    symbol={symbol}
                    basePrice={currentAsset?.price}
                    initialData={liveData}
                />
            </div>

            {/* Simulated Market Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-secondary flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-dark-text-secondary font-medium">Market Capitalization</p>
                        <p className="text-xl font-bold text-dark-text">{formatPrice(marketCap)}</p>
                    </div>
                </div>

                <div className="card-secondary flex items-center gap-4">
                    <div className="p-3 bg-warning/10 rounded-xl text-warning">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-dark-text-secondary font-medium">Volume (24h)</p>
                        <p className="text-xl font-bold text-dark-text">{formatPrice(volume24h)}</p>
                    </div>
                </div>

                <div className="card-secondary flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-xl text-success">
                        <BarChart2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-dark-text-secondary font-medium">Circulating Supply</p>
                        <p className="text-xl font-bold text-dark-text">19.5M {symbol}</p>
                    </div>
                </div>
            </div>

            {/* Trade Modal Mount */}
            <TradeModal
                isOpen={tradeModal.isOpen}
                onClose={() => setTradeModal({ ...tradeModal, isOpen: false })}
                symbol={symbol}
                price={displayPrice}
                type={tradeModal.type}
            />
        </div>
    );
}
