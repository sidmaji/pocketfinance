/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    images: {
        unoptimized: true,
        domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
