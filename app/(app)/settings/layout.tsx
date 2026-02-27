import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Manage your virtual trading account preferences, theme configurations, and data resets.',
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
