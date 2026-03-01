import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-white/5 dark:bg-white/10 rounded-lg ${className}`}
        />
    );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between border-b border-dark-border pb-4 w-full">
                {Array(columns).fill(0).map((_, i) => (
                    <Skeleton key={`header-${i}`} className="h-6 w-24" />
                ))}
            </div>
            {Array(rows).fill(0).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex justify-between py-4 border-b border-dark-border/50">
                    {Array(columns).fill(0).map((_, colIndex) => (
                        <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-5 w-24" />
                    ))}
                </div>
            ))}
        </div>
    );
}
