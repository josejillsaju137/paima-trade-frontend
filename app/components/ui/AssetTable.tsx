'use client';

import Link from 'next/link';
import { formatPrice, formatPercent, getChangeColor, getChangeBgColor } from '@/app/utils/formatters';

interface AssetTableProps {
    assets: Array<{
        symbol: string;
        name: string;
        price: number;
        change24h: number;
        changePercent24h: number;
    }>;
    onBuy: (symbol: string, price: number) => void;
    onSell: (symbol: string, price: number) => void;
    showActions?: boolean;
}

export default function AssetTable({ assets, onBuy, onSell, showActions = true }: AssetTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-dark-border">
                        <th className="text-left py-4 px-4 text-dark-text-secondary font-medium">Asset</th>
                        <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Price</th>
                        <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">24h Change</th>
                        <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Change %</th>
                        {showActions && <th className="text-right py-4 px-4 text-dark-text-secondary font-medium">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.symbol} className="border-b border-dark-border hover:bg-dark-surface-alt transition-colors">
                            <td className="py-4 px-4">
                                <Link href={`/asset/${asset.symbol}`} className="block hover:underline hover:text-primary transition-all">
                                    <p className="font-semibold text-dark-text">{asset.symbol}</p>
                                    <p className="text-sm text-dark-text-secondary">{asset.name}</p>
                                </Link>
                            </td>
                            <td className="text-right py-4 px-4 font-semibold">{formatPrice(asset.price)}</td>
                            <td className={`text-right py-4 px-4 font-semibold ${getChangeColor(asset.change24h)}`}>
                                {asset.change24h >= 0 ? '+₹' : '-₹'}{Math.abs(asset.change24h).toFixed(2)}
                            </td>
                            <td className="text-right py-4 px-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getChangeBgColor(asset.changePercent24h)}`}>
                                    {formatPercent(asset.changePercent24h)}
                                </span>
                            </td>
                            {showActions && (
                                <td className="text-right py-4 px-4">
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => onBuy(asset.symbol, asset.price)}
                                            className="px-3 py-1 bg-success hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                                        >
                                            Buy
                                        </button>
                                        <button
                                            onClick={() => onSell(asset.symbol, asset.price)}
                                            className="px-3 py-1 bg-danger hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                                        >
                                            Sell
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
