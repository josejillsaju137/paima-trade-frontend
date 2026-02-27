import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Portfolio',
    description: 'Track your virtual cryptocurrency holdings, average buy prices, and complete trade history on PaimaTrade.',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
