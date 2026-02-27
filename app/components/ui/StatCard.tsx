'use client';

import { formatPrice, formatPercent, getChangeColor, getChangeBgColor } from '@/app/utils/formatters';

interface StatCardProps {
    label: string;
    value: string | number;
    change?: number;
    icon?: string;
    onClick?: () => void;
}

export default function StatCard({ label, value, change, icon, onClick }: StatCardProps) {
    return (
        <div
            onClick={onClick}
            className={`card cursor-pointer hover:scale-105 transition-transform ${onClick ? 'cursor-pointer' : ''
                }`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-dark-text-secondary mb-2">{label}</p>
                    <p className="text-2xl font-bold text-dark-text">{value}</p>
                    {change !== undefined && (
                        <p className={`text-sm mt-2 ${getChangeColor(change)}`}>
                            {formatPercent(change)}
                        </p>
                    )}
                </div>
                {icon && <span className="text-4xl">{icon}</span>}
            </div>
        </div>
    );
}
