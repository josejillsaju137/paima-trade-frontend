import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How It Works',
    description: 'Discover how PaimaTrade simulates real cryptocurrency markets. Learn to create an account, get virtual funds, explore markets, and track your global rank.',
    openGraph: {
        title: 'How PaimaTrade Works | Crypto Trading Guide',
        description: 'Master the PaimaTrade platform with our step-by-step guide to virtual cryptocurrency trading and portfolio management.',
    }
};

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Navbar */}
            <nav className="border-b border-dark-border sticky top-0 z-40 bg-dark-bg/80 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    <a href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            📈
                        </div>
                        PaimaTrade
                    </a>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold mb-8 text-dark-text">How PaimaTrade Works</h1>

                <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="card">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-dark-text">Create Your Account</h2>
                                <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                                    Sign up in seconds with a valid email. Choose a unique username that will appear on the leaderboard. No credit card required—this is completely free!
                                </p>
                                <div className="bg-dark-surface-alt p-4 rounded-lg text-dark-text-secondary">
                                    💡 <strong>Tip:</strong> Choose a memorable username—it's how other traders will know you!
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="card">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-dark-text">Get Your Virtual Funds</h2>
                                <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                                    You'll instantly receive $10,000 in virtual trading funds. This is your starting capital for trading. Your balance, portfolio, and trading history are tracked across all your sessions.
                                </p>
                                <ul className="space-y-2 text-dark-text-secondary">
                                    <li className="flex gap-2">
                                        <span>💰</span>
                                        <span><strong>Starting Balance:</strong> $10,000</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>📅</span>
                                        <span><strong>Leaderboard Cycle:</strong> Weekly (resets every Monday)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>🔄</span>
                                        <span><strong>Reset Option:</strong> Available anytime in settings</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="card">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-dark-text">Explore the Market</h2>
                                <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                                    Browse our market page to see real-time prices of 8 major cryptocurrencies. Prices update every minute with realistic market simulations including random percentage changes to mimic real market volatility.
                                </p>
                                <div className="bg-dark-surface-alt p-4 rounded-lg text-dark-text-secondary">
                                    <strong>Available Assets:</strong>
                                    <ul className="mt-3 space-y-1 grid grid-cols-2">
                                        <li>✓ Bitcoin (BTC)</li>
                                        <li>✓ Ethereum (ETH)</li>
                                        <li>✓ Ripple (XRP)</li>
                                        <li>✓ Solana (SOL)</li>
                                        <li>✓ Cardano (ADA)</li>
                                        <li>✓ Dogecoin (DOGE)</li>
                                        <li>✓ Avalanche (AVAX)</li>
                                        <li>✓ Chainlink (LINK)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="card">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-dark-text">Place Your Trades</h2>
                                <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                                    Click "Buy" or "Sell" on any asset to open the trade dialog. Enter the quantity you want to trade and confirm. The transaction is instant—no waiting!
                                </p>
                                <div className="space-y-3 text-dark-text-secondary">
                                    <div className="bg-dark-surface-alt p-4 rounded-lg">
                                        <strong>📈 Buying:</strong>
                                        <p className="mt-2">You'll deduct money from your available balance. If you don't have enough, the purchase will be rejected.</p>
                                    </div>
                                    <div className="bg-dark-surface-alt p-4 rounded-lg">
                                        <strong>📉 Selling:</strong>
                                        <p className="mt-2">You can only sell assets you own. You'll receive cash equal to quantity × current price.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="card">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                5
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-dark-text">Track Your Portfolio</h2>
                                <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                                    Your Dashboard shows a complete overview of your trading activity. See your total balance, current holdings, portfolio value, and overall profit/loss.
                                </p>
                                <div className="bg-dark-surface-alt p-4 rounded-lg text-dark-text-secondary">
                                    <strong>Portfolio includes:</strong>
                                    <ul className="mt-3 space-y-1">
                                        <li>✓ Current holdings by asset</li>
                                        <li>✓ Average buy price vs current price</li>
                                        <li>✓ Unrealized profit/loss per asset</li>
                                        <li>✓ Total portfolio value</li>
                                        <li>✓ Overall return percentage</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 6 */}
                    <div className="card">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                6
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-dark-text">Compete on the Leaderboard</h2>
                                <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                                    Your trading performance is automatically tracked and displayed on the global leaderboard. See how you rank against other traders based on your return percentage.
                                </p>
                                <div className="bg-dark-surface-alt p-4 rounded-lg text-dark-text-secondary">
                                    <strong>Leaderboard Features:</strong>
                                    <ul className="mt-3 space-y-1">
                                        <li>✓ Top 10 traders ranked by return %</li>
                                        <li>✓ Your position highlighted</li>
                                        <li>✓ Weekly rankings (reset every Monday)</li>
                                        <li>✓ Total profit shown in dollars and percentage</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips section */}
                <div className="mt-12 card bg-primary/10 border border-primary">
                    <h2 className="text-3xl font-bold mb-6 text-primary">💡 Trading Tips for Success</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="font-bold text-dark-text">1. Diversify Your Portfolio</h3>
                            <p className="text-dark-text-secondary">Don't put all your money in one asset. Spread across multiple cryptocurrencies to reduce risk.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-dark-text">2. Start Small</h3>
                            <p className="text-dark-text-secondary">Trade small quantities first to get comfortable with the platform before making bigger moves.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-dark-text">3. Watch Price Trends</h3>
                            <p className="text-dark-text-secondary">Pay attention to 24h changes. Look for patterns before deciding to buy or sell.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-dark-text">4. Keep Track of Trades</h3>
                            <p className="text-dark-text-secondary">Review your trade history regularly to learn from your successes and mistakes.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-dark-text">5. Don't Panic Sell</h3>
                            <p className="text-dark-text-secondary">Market volatility is normal. Hold your positions if you believe in long-term growth.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-dark-text">6. Learn & Improve</h3>
                            <p className="text-dark-text-secondary">Use this platform to test strategies and gather experience before real trading.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a href="/" className="btn-primary px-8 py-3 inline-block">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
