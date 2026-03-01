'use client';

import { useState } from 'react';
import { useTradeStore } from '@/app/store/tradeStore';
import { usePriceStore } from '@/app/store/priceStore';
import CandlestickChart from './CandlestickChart';
import { formatPrice } from '@/app/utils/formatters';

interface TradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    symbol: string;
    price: number;
    type: 'buy' | 'sell';
}

export default function TradeModal({ isOpen, onClose, symbol, price, type }: TradeModalProps) {
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { buyAsset, sellAsset, portfolio, balance } = useTradeStore();

    const total = parseFloat(quantity || '0') * price;
    const holding = portfolio[symbol];

    const handleTrade = async () => {
        const qty = parseFloat(quantity);

        if (!quantity || qty <= 0) {
            setError('Please enter a valid quantity');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            if (type === 'buy') {
                if (balance < total) {
                    setError('Insufficient balance');
                    setIsLoading(false);
                    return;
                }

                await buyAsset(symbol, qty, price);

                onClose();
                setQuantity('');
                setError('');
            } else {
                if (!holding || holding.quantity < qty) {
                    setError('Insufficient holdings');
                    setIsLoading(false);
                    return;
                }

                await sellAsset(symbol, qty, price);

                onClose();
                setQuantity('');
                setError('');
            }
        } catch (err: any) {
            setError(err.message || 'Trade failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-4xl w-full flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
                {/* Left side: Chart */}
                <div className="flex-1 min-w-0 flex flex-col hidden md:flex">
                    <CandlestickChart symbol={symbol} basePrice={price} />
                </div>

                {/* Right side: Trading Controls */}
                <div className="w-full md:w-80 flex-shrink-0 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            {type === 'buy' ? '📈 Buy' : '📉 Sell'} {symbol}
                        </h2>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="text-2xl hover:text-primary transition-colors disabled:opacity-50"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 space-y-4">
                        {/* Price info */}
                        <div className="bg-dark-surface-alt p-4 rounded-lg">
                            <p className="text-sm text-dark-text-secondary">Current Price</p>
                            <p className="text-2xl font-bold text-primary">{formatPrice(price)}</p>
                        </div>

                        {/* Quantity input */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Quantity</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="0"
                                    disabled={isLoading}
                                    className="input pr-16 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-text-secondary font-medium uppercase">
                                    {symbol}
                                </span>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="bg-dark-surface-alt p-4 rounded-lg">
                            <p className="text-sm text-dark-text-secondary">Total</p>
                            <p className="text-2xl font-bold">{formatPrice(total)}</p>
                        </div>

                        {/* Available balance/holdings */}
                        <div className="bg-dark-surface-alt p-4 rounded-lg">
                            <p className="text-sm text-dark-text-secondary">
                                {type === 'buy' ? 'Available Balance' : 'Your Holdings'}
                            </p>
                            <p className="text-lg font-bold">
                                {type === 'buy'
                                    ? formatPrice(balance)
                                    : `${Number(holding?.quantity || 0).toFixed(4)} ${symbol}`}
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-danger/10 border border-danger rounded-lg p-3 text-danger text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-dark-border">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleTrade}
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${type === 'buy'
                                ? 'bg-success hover:bg-green-700'
                                : 'bg-danger hover:bg-red-700'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : type === 'buy' ? 'Buy' : 'Sell'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
