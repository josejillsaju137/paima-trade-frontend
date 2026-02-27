import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Crypto Market',
    description: 'Browse the live mock cryptocurrency market. Track prices, analyze 24h changes, and execute virtual trades instantly.',
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
