import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn about PaimaTrade, our mission to provide a risk-free cryptocurrency trading simulator, and why we believe education is the foundation of successful trading.',
    openGraph: {
        title: 'About PaimaTrade | Crypto Simulator',
        description: 'Discover the story behind PaimaTrade and our mission to educate the next generation of cryptocurrency traders without any financial risk.',
    }
};

export default function AboutPage() {
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
                <h1 className="text-5xl font-bold mb-8 text-dark-text">About PaimaTrade</h1>

                <div className="space-y-8 prose prose-invert max-w-none">
                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">Our Mission</h2>
                        <p className="text-dark-text-secondary text-lg leading-relaxed">
                            PaimaTrade is dedicated to providing a safe, risk-free environment for aspiring traders to learn about cryptocurrency and virtual trading. We believe that education is the foundation of successful trading, and our platform serves as that educational stepping stone.
                        </p>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">Why We Started</h2>
                        <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                            The trading world can be intimidating for beginners. Real money is at stake, emotions run high, and one mistake can result in significant losses. We created PaimaTrade to change that.
                        </p>
                        <p className="text-dark-text-secondary text-lg leading-relaxed">
                            Our platform provides $10,000 in virtual trading funds, allowing users to practice strategies, understand market dynamics, and build confidence—all without any financial risk.
                        </p>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">What We Offer</h2>
                        <ul className="space-y-3 text-dark-text-secondary text-lg">
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">✓</span>
                                <span>Virtual trading with real market simulation</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">✓</span>
                                <span>8 major cryptocurrencies to trade</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">✓</span>
                                <span>Real-time price updates and market data</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">✓</span>
                                <span>Comprehensive portfolio tracking</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">✓</span>
                                <span>Global leaderboard to compete and learn</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">✓</span>
                                <span>Detailed trade history and analytics</span>
                            </li>
                        </ul>
                    </div>

                    <div className="card bg-warning/5 border border-warning/30">
                        <h2 className="text-3xl font-bold mb-4 text-warning flex items-center gap-2">
                            ⚠️ Important Disclaimer
                        </h2>
                        <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                            PaimaTrade is <strong>exclusively for educational purposes</strong>. This is NOT a real trading platform, and no actual money is exchanged. The virtual portfolio and trading functionalities are simulations designed to help you learn trading concepts.
                        </p>
                        <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
                            The information, strategies, and performance metrics on this platform should not be interpreted as financial advice. Past performance in virtual trading does not guarantee future results in real trading.
                        </p>
                        <p className="text-dark-text-secondary text-lg leading-relaxed">
                            <strong>Never make real trading decisions based solely on this platform.</strong> Always conduct thorough research and consult with financial professionals before investing real money.
                        </p>
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
