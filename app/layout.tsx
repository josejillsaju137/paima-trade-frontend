import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "./components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | PaimaTrade',
    default: 'PaimaTrade - Virtual Stock & Crypto Trading Simulator',
  },
  description: "Learn to trade with a virtual portfolio. Practice buying and selling cryptocurrencies risk-free with live mock prices, real-time charting, and global leaderboards.",
  keywords: ["virtual trading", "crypto simulator", "paper trading", "cryptocurrency trading practice", "stock simulator", "PaimaTrade"],
  authors: [{ name: "PaimaTrade" }],
  creator: "PaimaTrade",
  publisher: "PaimaTrade",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paimatrade.com",
    title: "PaimaTrade - Master Crypto Trading Risk-Free",
    description: "Experience the thrill of trading cryptocurrencies with a virtual $10,000 portfolio. Track your P&L, read candlestick charts, and compete on the global leaderboard.",
    siteName: "PaimaTrade",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PaimaTrade Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PaimaTrade - Virtual Stock & Crypto Simulator",
    description: "Learn to trade risk-free. Join thousands of users practicing their crypto strategies on PaimaTrade today.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: '📈',
    apple: '📈',
  },
  metadataBase: new URL('https://paimatrade.com'), // Replace with actual production domain when ready
};
import { ThemeProvider } from "./components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-bg text-dark-text`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
