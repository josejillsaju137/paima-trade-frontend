export type Timeframe = '1m' | '1h' | '1d' | '1W' | '1Y';

export interface OHLCData {
    time: import('lightweight-charts').Time;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

export const generateMockCandles = (
    basePrice: number,
    timeframe: Timeframe,
    count: number = 100
): OHLCData[] => {
    const data: OHLCData[] = [];

    // Define time intervals in seconds
    const intervals: Record<Timeframe, number> = {
        '1m': 60,
        '1h': 3600,
        '1d': 86400,
        '1W': 604800,
        '1Y': 31536000,
    };

    // Volatility loosely based on timeframe
    const volatility: Record<Timeframe, number> = {
        '1m': 0.001,
        '1h': 0.005,
        '1d': 0.02,
        '1W': 0.05,
        '1Y': 0.2,
    };

    const interval = intervals[timeframe];
    const vol = volatility[timeframe];

    let currentPrice = basePrice;
    // Start back in time so the last candle is roughly "now"
    let currentTime = Math.floor(Date.now() / 1000) - count * interval;

    for (let i = 0; i < count; i++) {
        const change = currentPrice * vol * (Math.random() - 0.5);
        const open = currentPrice;
        const close = currentPrice + change;

        // High is max of open/close + some random noise above
        const high = Math.max(open, close) + currentPrice * vol * Math.random();
        // Low is min of open/close - some random noise below
        const low = Math.min(open, close) - currentPrice * vol * Math.random();

        // Volume is roughly proportional to volatility and random
        const baseVolume = 1000000 / currentPrice;
        const volume = Math.max(100, baseVolume * (0.5 + Math.random()) * (1 + Math.abs(change) / currentPrice * 10));

        data.push({
            time: currentTime as import('lightweight-charts').UTCTimestamp,
            open,
            high,
            low,
            close,
            volume,
        });

        currentPrice = close;
        currentTime += interval;
    }

    return data;
};

export const calculateSMA = (data: OHLCData[], period: number) => {
    const smaData: { time: import('lightweight-charts').Time; value: number }[] = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) continue;

        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j].close;
        }

        smaData.push({ time: data[i].time, value: sum / period });
    }

    return smaData;
};
