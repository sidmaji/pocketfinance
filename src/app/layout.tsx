import ErrorBoundary from '@/components/common/ErrorBoundary'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
    title: 'PockFin - Personal Finance Simulation & Education',
    description: 'Powerful personal finance simulations and literacy for all ages. Learn through interactive experiences, plan major life events, and build wealth confidently.',
    keywords: 'finance, education, simulation, investment, budgeting, financial literacy, personal finance, retirement planning, pocket',
    authors: [{ name: 'PockFin Team' }],
    openGraph: {
        title: 'PockFin - Personal Finance Simulation & Education',
        description: 'Powerful personal finance simulations and literacy for all ages',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PockFin - Personal Finance Simulation & Education',
        description: 'Powerful personal finance simulations and literacy for all ages',
    },
    robots: 'index, follow',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </head>
            <body className="antialiased">
                <ErrorBoundary>
                    <AuthProvider>
                        <div id="root">{children}</div>
                    </AuthProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
