import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
import { OHLCData } from '@/app/utils/chartData';

interface BEChartTick {
    id: number;
    symbol: string;
    price: string;
    timestamp: string;
}

const mapTickToOHLC = (tick: BEChartTick): OHLCData => {
    const priceFloat = parseFloat(tick.price);
    return {
        time: Math.floor(new Date(tick.timestamp).getTime() / 1000) as import('lightweight-charts').UTCTimestamp,
        open: priceFloat,
        high: priceFloat,
        low: priceFloat,
        close: priceFloat,
        // Optional: you can mock volume or just leave it out if the BE doesn't provide it
    };
};

export function useLiveChartData(symbol: string) {
    const [data, setData] = useState<OHLCData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let socket: Socket;
        setIsLoading(true);
        setError(null);

        // 1. Fetch historical initial array
        fetch(`${API_URL}/api/history/${symbol}?limit=150`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch historical data');
                return res.json();
            })
            .then((historicalData: BEChartTick[]) => {
                const mappedData = historicalData.map(mapTickToOHLC);
                // Ensure data is sorted by time ascending, just in case
                mappedData.sort((a, b) => (a.time as number) - (b.time as number));
                setData(mappedData);
                setIsLoading(false);

                // 2. Initialize Socket.io after history is loaded
                socket = io(API_URL);

                socket.on('connect', () => {
                    console.log(`Connected to live feed for ${symbol}`);
                    // Optional: If backend requires subscribing to a specific room
                    // socket.emit('subscribe', symbol); 
                });

                // 3. Listen for price_update events and append
                socket.on('price_update', (rawTick: BEChartTick) => {
                    const newTick = mapTickToOHLC(rawTick);
                    setData(prevData => {
                        // Create a new array to trigger React re-render, appending the new tick
                        // Lightweight Charts requires time to be strictly ascending

                        // Safety check: ensure incoming tick is actually newer
                        const lastTick = prevData[prevData.length - 1];
                        if (lastTick && newTick.time <= lastTick.time) {
                            // If it's the SAME time (e.g. same day), update the existing candle instead of appending
                            const updatedPrev = [...prevData];
                            updatedPrev[updatedPrev.length - 1] = newTick;
                            return updatedPrev;
                        }

                        return [...prevData, newTick];
                    });
                });

                socket.on('connect_error', (err) => {
                    console.error('Socket connection error:', err);
                    setError('Failed to connect to live feed.');
                });
            })
            .catch(err => {
                console.error('Error loading chart data:', err);
                setError(err.message);
                setIsLoading(false);
            });

        // Cleanup on unmount or symbol change
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [symbol]);

    return { data, isLoading, error };
}
