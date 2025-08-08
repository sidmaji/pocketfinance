// src/app/layout.tsx
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
    metadataBase: new URL('https://pockfin.com'),
    title: 'PockFin - Personal Finance Simulation & Education',
    description: 'Powerful personal finance simulations and literacy for all ages. Learn through interactive experiences, plan major life events, and build wealth confidently.',
    keywords: 'finance, education, simulation, investment, budgeting, financial literacy, personal finance, retirement planning, pockfin, pocketfinance, pocketfin',
    authors: [{ name: 'PockFin Team', url: 'https://pockfin.com' }],
    openGraph: {
        title: 'PockFin - Personal Finance Simulation & Education',
        description: 'Powerful personal finance simulations and literacy for all ages.',
        type: 'website',
        locale: 'en_US',
        url: 'https://pockfin.com',
        siteName: 'PockFin',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'PockFin - Personal Finance Simulation & Education',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PockFin - Personal Finance Simulation & Education',
        description: 'Powerful personal finance simulations and literacy for all ages.',
        images: ['/og-image.png'],
    },
    robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={manrope.className}>
            <head>
                {/* Favicons & Manifest */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="canonical" href="https://pockfin.com" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'PockFin',
                            url: 'https://pockfin.com',
                            description: 'Powerful personal finance simulations and literacy for all ages.',
                            inLanguage: 'en-US',
                            publisher: {
                                '@type': 'Organization',
                                name: 'PockFin',
                                logo: {
                                    '@type': 'ImageObject',
                                    url: 'https://pockfin.com/logo.svg',
                                },
                                contactPoint: {
                                    '@type': 'ContactPoint',
                                    email: 'support@pockfin.com',
                                    contactType: 'customer support',
                                    availableLanguage: 'English',
                                },
                            },
                        }),
                    }}
                />
            </head>
            <body className="antialiased bg-white text-gray-900">
                {/* Google Analytics */}
                <Script src={`https://www.googletagmanager.com/gtag/js?id=G-2LHZVSHMJG`} strategy="afterInteractive" />
                <Script id="ga-init" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2LHZVSHMJG', {
              page_path: window.location.pathname,
            });
          `}
                </Script>

                <ErrorBoundary>
                    <AuthProvider>
                        <div id="root">{children}</div>
                    </AuthProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
