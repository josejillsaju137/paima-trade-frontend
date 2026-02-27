import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Global Leaderboard',
    description: 'Compete against traders worldwide. Check your weekly ranking and portfolio return percentages on PaimaTrade.',
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
