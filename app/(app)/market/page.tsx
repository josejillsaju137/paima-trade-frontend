'use client';

import { useEffect, useState } from 'react';
import { useTradeStore } from '@/app/store/tradeStore';
import { usePriceStore } from '@/app/store/priceStore';
import { mockAssets } from '@/app/utils/mockData';
import AssetTable from '@/app/components/ui/AssetTable';
import TradeModal from '@/app/components/ui/TradeModal';
import { formatPrice } from '@/app/utils/formatters';

export default function MarketPage() {
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'price' | 'change'>('change');
    const [tradeModal, setTradeModal] = useState<{
        isOpen: boolean;
        symbol: string;
        price: number;
        type: 'buy' | 'sell';
    }>({
        isOpen: false,
        symbol: '',
        price: 0,
        type: 'buy',
    });

    const { portfolio } = useTradeStore();
    const { assets, setAssets } = usePriceStore();

    // Initialize prices
    useEffect(() => {
        const initialAssets = mockAssets.reduce((acc, asset) => {
            acc[asset.symbol] = asset;
            return acc;
        }, {} as Record<string, any>);
        setAssets(initialAssets);
        setMounted(true);

        // Simulate price updates
        const interval = setInterval(() => {
            const currentAssets = usePriceStore.getState().assets;
            const updated = { ...currentAssets };

            Object.entries(updated).forEach(([symbol, asset]) => {
                const randomChange = (Math.random() - 0.5) * 4; // -2% to +2%
                const originalAsset = mockAssets.find((a) => a.symbol === symbol)!;
                const newPrice = asset.price * (1 + randomChange / 100);
                const change24h = newPrice - originalAsset.price;
                const changePercent24h = (change24h / originalAsset.price) * 100;

                updated[symbol] = {
                    ...asset,
                    price: newPrice,
                    change24h,
                    changePercent24h
                };
            });

            setAssets(updated);
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [setAssets]);

    if (!mounted) return <div className="p-6 text-center">Loading...</div>;

    // Filter and sort assets
    let displayAssets = Object.values(assets).filter((asset: any) =>
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'price') {
        displayAssets.sort((a: any, b: any) => b.price - a.price);
    } else {
        displayAssets.sort((a: any, b: any) => Math.abs(b.changePercent24h) - Math.abs(a.changePercent24h));
    }

    const handleBuy = (symbol: string, price: number) => {
        setTradeModal({ isOpen: true, symbol, price, type: 'buy' });
    };

    const handleSell = (symbol: string, price: number) => {
        setTradeModal({ isOpen: true, symbol, price, type: 'sell' });
    };

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-dark-text">Market</h1>
                <p className="text-dark-text-secondary">Browse and trade cryptocurrencies</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-dark-text-secondary text-sm">🔍</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input pl-10 w-full"
                    />
                </div>
                <div className="w-full sm:w-auto sm:min-w-[200px]">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'price' | 'change')}
                        className="input w-full appearance-none cursor-pointer bg-dark-surface"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1rem',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="change">Sort by Change %</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>
            </div>

            {/* Assets Table */}
            <div className="card overflow-hidden">
                <AssetTable
                    assets={displayAssets}
                    onBuy={handleBuy}
                    onSell={handleSell}
                    showActions={true}
                />
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
