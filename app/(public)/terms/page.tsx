import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Disclaimer',
    description: 'Read the Terms of Service and Financial Disclaimers for PaimaTrade. Understand that our platform is exclusively for educational, risk-free virtual trading.',
    openGraph: {
        title: 'Terms & Educational Disclaimer | PaimaTrade',
        description: 'Important legal and financial risk disclaimers regarding the educational nature of the PaimaTrade virtual cryptocurrency simulator.',
    }
};

export default function TermsPage() {
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
                <h1 className="text-5xl font-bold mb-8 text-dark-text">Terms & Disclaimer</h1>

                <div className="space-y-8 prose prose-invert max-w-none">
                    <div className="card bg-danger/5 border border-danger">
                        <h2 className="text-3xl font-bold mb-4 text-danger">⚠️ IMPORTANT: EDUCATIONAL USE ONLY</h2>
                        <p className="text-dark-text text-lg leading-relaxed">
                            <strong>PaimaTrade is exclusively for educational purposes.</strong> This is NOT a real trading platform. No real money is exchanged, and the virtual portfolio is a simulation only.
                        </p>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">1. Terms of Service</h2>
                        <div className="space-y-4 text-dark-text-secondary text-lg">
                            <p>
                                By using PaimaTrade, you agree to these terms and conditions. If you do not agree, please do not use this platform.
                            </p>
                            <div>
                                <h3 className="font-bold text-dark-text mb-2">1.1 Account Responsibility</h3>
                                <p>
                                    You are responsible for maintaining the confidentiality of your account information. You agree to accept responsibility for all activities that occur under your account.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-dark-text mb-2">1.2 Virtual Trading Only</h3>
                                <p>
                                    PaimaTrade provides virtual trading with simulated prices. No real trades are executed. Performance on this platform does not indicate real trading ability.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-dark-text mb-2">1.3 Account Reset</h3>
                                <p>
                                    Your virtual balance is $10,000. You can reset your account at any time. All trading history and holdings will be cleared upon reset.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">2. Financial Disclaimer</h2>
                        <div className="space-y-4 text-dark-text-secondary text-lg">
                            <p className="font-bold text-dark-text">
                                🚫 DO NOT USE THIS PLATFORM FOR MAKING REAL TRADING DECISIONS
                            </p>
                            <ul className="space-y-2">
                                <li className="flex gap-3">
                                    <span>•</span>
                                    <span>This platform is NOT a substitute for financial advice from qualified professionals.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span>•</span>
                                    <span>Simulated results do not reflect real market conditions or real trading outcomes.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span>•</span>
                                    <span>Past simulated performance does NOT guarantee future real trading results.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span>•</span>
                                    <span>Real cryptocurrency trading carries significant financial risk, including total loss of investment.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span>•</span>
                                    <span>Only trade with real money you can afford to lose. Consult a financial advisor before real trading.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">3. Prices & Market Data</h2>
                        <div className="space-y-4 text-dark-text-secondary text-lg">
                            <div>
                                <h3 className="font-bold text-dark-text mb-2">3.1 Simulated Prices</h3>
                                <p>
                                    All prices on PaimaTrade are simulated and for educational purposes only. They may not reflect actual real-time market prices of cryptocurrencies. Actual prices should be checked on real exchanges.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-dark-text mb-2">3.2 Market Updates</h3>
                                <p>
                                    Prices update regularly to simulate market movement. Random percentage changes are applied to create realistic market volatility.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">4. Limitation of Liability</h2>
                        <div className="space-y-4 text-dark-text-secondary text-lg">
                            <p>
                                PaimaTrade is provided "as is" without warranties. We are not liable for:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li>• Any trading decisions made based on this platform</li>
                                <li>• Financial losses from real trading (our platform is not real)</li>
                                <li>• Accuracy or completeness of simulated data</li>
                                <li>• Server downtime or platform interruptions</li>
                                <li>• Any indirect or consequential damages</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">5. User Conduct</h2>
                        <div className="space-y-4 text-dark-text-secondary text-lg">
                            <p>You agree not to:</p>
                            <ul className="space-y-2 ml-4">
                                <li>• Use the platform for any illegal purposes</li>
                                <li>• Attempt to gain unauthorized access</li>
                                <li>• Harass other users</li>
                                <li>• Share your account credentials</li>
                                <li>• Violate any applicable laws or regulations</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">6. Changes to Terms</h2>
                        <p className="text-dark-text-secondary text-lg">
                            We reserve the right to modify these terms at any time. Your continued use of the platform constitutes acceptance of modified terms.
                        </p>
                    </div>

                    <div className="card bg-warning/5 border border-warning">
                        <h2 className="text-4xl font-bold mb-6 text-warning">⚠️ CRYPTOCURRENCY TRADING RISKS</h2>
                        <div className="space-y-4 text-lg">
                            <p className="text-dark-text">
                                Real cryptocurrency trading involves significant risks. Before trading with real money, understand:
                            </p>
                            <ul className="space-y-3 text-dark-text-secondary">
                                <li>
                                    <strong className="text-dark-text">Volatility:</strong> Cryptocurrency prices can change dramatically in short periods, potentially resulting in total loss.
                                </li>
                                <li>
                                    <strong className="text-dark-text">Leverage Risk:</strong> Margin trading amplifies both gains and losses.
                                </li>
                                <li>
                                    <strong className="text-dark-text">Technical Risk:</strong> Exchange outages, hacks, or smart contract bugs can result in fund loss.
                                </li>
                                <li>
                                    <strong className="text-dark-text">Regulatory Risk:</strong> Cryptocurrency regulation is evolving and may impact value.
                                </li>
                                <li>
                                    <strong className="text-dark-text">No Guarantees:</strong> No one can predict market movements reliably.
                                </li>
                            </ul>
                            <p className="text-dark-text font-bold mt-6">
                                Only invest what you can afford to lose. Always use proper risk management.
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4 text-dark-text">Contact & Support</h2>
                        <p className="text-dark-text-secondary text-lg">
                            For questions about these terms or the platform, please contact us through the platform's support channel.
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
