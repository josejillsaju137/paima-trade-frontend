import { Metadata } from 'next';

type Props = {
    params: Promise<{ symbol: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const symbol = (await params).symbol.toUpperCase();
    return {
        title: `${symbol} Live Chart`,
        description: `View the real-time interactive Candlestick chart, 24h volume, and dummy market statistics for ${symbol} on PaimaTrade.`,
        openGraph: {
            title: `${symbol} | PaimaTrade Analytics`,
            description: `Track live mock price action and analyze ${symbol} charts securely on PaimaTrade.`,
        }
    };
}

export default function AssetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
