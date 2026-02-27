import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries, LineSeries, AreaSeries, HistogramSeries } from 'lightweight-charts';
import { generateMockCandles, calculateSMA, Timeframe, OHLCData } from '@/app/utils/chartData';

export type ChartType = 'candlestick' | 'line' | 'area';

interface CandlestickChartProps {
    symbol: string;
    basePrice?: number;         // Used for fallback mock generation
    initialData?: OHLCData[];   // Used for live backend feeds
}

const timeframes: Timeframe[] = ['1m', '1h', '1d', '1W', '1Y'];

export default function CandlestickChart({ symbol, basePrice, initialData }: CandlestickChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    // Series refs
    const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
    const areaSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
    const smaSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

    // UI State
    const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1d');
    const [chartType, setChartType] = useState<ChartType>('candlestick');
    const [showVolume, setShowVolume] = useState(true);
    const [showSMA, setShowSMA] = useState(false);

    // Initial Chart Creation
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#d1d5db', // dark-text-secondary
            },
            grid: {
                vertLines: { color: '#2D3561' }, // dark-border
                horzLines: { color: '#2D3561' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderVisible: false,
            },
            rightPriceScale: {
                borderVisible: false,
            }
        });

        chartRef.current = chart;

        // Initialize all chart type series
        candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
            upColor: '#00C027',
            downColor: '#FF0000',
            borderVisible: false,
            wickUpColor: '#00C027',
            wickDownColor: '#FF0000',
        });

        lineSeriesRef.current = chart.addSeries(LineSeries, {
            color: '#3B82F6', // blue-500
            lineWidth: 2,
        });

        areaSeriesRef.current = chart.addSeries(AreaSeries, {
            lineColor: '#3B82F6', // blue-500
            topColor: 'rgba(59, 130, 246, 0.4)',
            bottomColor: 'rgba(59, 130, 246, 0.0)',
            lineWidth: 2,
        });

        // Add Volume series on a separate scale
        volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
            priceFormat: { type: 'volume' },
            priceScaleId: '', // overlay
        });

        volumeSeriesRef.current.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8, // highest point of the series will be at 80%
                bottom: 0,
            },
        });

        // Add SMA series overlay
        smaSeriesRef.current = chart.addSeries(LineSeries, {
            color: '#F59E0B', // amber-500
            lineWidth: 2,
            crosshairMarkerVisible: false,
            priceScaleId: 'right', // same as main series
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    // Sync Series and Data
    useEffect(() => {
        if (!chartRef.current) return;
        const chart = chartRef.current;

        // Use live initial data if provided, otherwise fallback to generating local mock data based on basePrice
        let data: OHLCData[] = [];
        if (initialData && initialData.length > 0) {
            data = initialData;
        } else if (basePrice) {
            data = generateMockCandles(basePrice, activeTimeframe, 150);
        } else {
            return; // Guard against no data available
        }

        // Hide all main series first
        candlestickSeriesRef.current?.setData([]);
        lineSeriesRef.current?.setData([]);
        areaSeriesRef.current?.setData([]);

        // Set Main Data based on active chartType
        if (chartType === 'candlestick') {
            candlestickSeriesRef.current?.setData(data);
        } else if (chartType === 'line') {
            const lineData = data.map(d => ({ time: d.time, value: d.close }));
            lineSeriesRef.current?.setData(lineData);
        } else if (chartType === 'area') {
            const areaData = data.map(d => ({ time: d.time, value: d.close }));
            areaSeriesRef.current?.setData(areaData);
        }

        // Set Volume Data
        if (volumeSeriesRef.current) {
            if (showVolume) {
                const volData = data.map(d => ({
                    time: d.time,
                    value: d.volume || 0,
                    color: d.close >= d.open ? 'rgba(0, 192, 39, 0.3)' : 'rgba(255, 0, 0, 0.3)'
                }));
                volumeSeriesRef.current.setData(volData);
            } else {
                volumeSeriesRef.current.setData([]);
            }
        }

        // Set SMA Data
        if (smaSeriesRef.current) {
            if (showSMA) {
                const smaData = calculateSMA(data, 20); // 20 period SMA
                smaSeriesRef.current.setData(smaData);
            } else {
                smaSeriesRef.current.setData([]);
            }
        }

        chart.timeScale().fitContent();
    }, [chartType, activeTimeframe, basePrice, initialData, showVolume, showSMA]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg text-dark-text">{symbol} Chart</h3>

                    {/* Indicators Toggle */}
                    <div className="flex items-center gap-4 text-sm bg-dark-surface-alt px-3 py-1.5 rounded-lg border border-dark-border">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showVolume}
                                onChange={(e) => setShowVolume(e.target.checked)}
                                className="rounded border-dark-border bg-dark-bg text-primary focus:ring-primary focus:ring-offset-dark-surface-alt"
                            />
                            <span className="text-dark-text-secondary font-medium">Vol</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showSMA}
                                onChange={(e) => setShowSMA(e.target.checked)}
                                className="rounded border-dark-border bg-dark-bg text-primary focus:ring-primary focus:ring-offset-dark-surface-alt"
                            />
                            <span className="text-dark-text-secondary font-medium">SMA</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* Chart Type Toggle */}
                    <div className="flex bg-dark-surface-alt rounded-lg p-1 border border-dark-border">
                        {['candlestick', 'line', 'area'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setChartType(type as ChartType)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${chartType === type
                                    ? 'bg-primary text-white'
                                    : 'text-dark-text-secondary hover:text-dark-text'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Timeframe Toggle */}
                    <div className="flex bg-dark-surface-alt rounded-lg p-1 border border-dark-border">
                        {timeframes.map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setActiveTimeframe(tf)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTimeframe === tf
                                    ? 'bg-primary text-white'
                                    : 'text-dark-text-secondary hover:text-dark-text'
                                    }`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div ref={chartContainerRef} className="w-full h-[300px]" />
        </div>
    );
}
