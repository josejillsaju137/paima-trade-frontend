import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'View your virtual trading portfolio, total balance, P&L, and recent market movements on PaimaTrade.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
