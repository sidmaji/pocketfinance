export interface Investment {
    symbol: string
    name: string
    type: 'stock' | 'etf' | 'crypto' | 'bond'
    price: number
    change: number
    changePercent: number
    marketCap?: string
    volume?: string
    pe?: number
    dividend?: number
}

export interface PortfolioHolding {
    symbol: string
    shares: number
    averageCost: number
    currentValue: number
    totalReturn: number
    totalReturnPercent: number
    weight: number
}

export interface Portfolio {
    id: string
    name: string
    totalValue: number
    totalReturn: number
    totalReturnPercent: number
    holdings: PortfolioHolding[]
    cash: number
}

export const mockInvestments: Investment[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', price: 175.43, change: 2.31, changePercent: 1.33, marketCap: '2.7T', volume: '52.4M', pe: 28.5, dividend: 0.5 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', type: 'stock', price: 378.85, change: -1.42, changePercent: -0.37, marketCap: '2.8T', volume: '25.1M', pe: 32.1, dividend: 0.7 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', price: 138.21, change: 0.89, changePercent: 0.65, marketCap: '1.7T', volume: '28.9M', pe: 26.4, dividend: 0 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock', price: 145.86, change: 3.22, changePercent: 2.26, marketCap: '1.5T', volume: '45.2M', pe: 52.3, dividend: 0 },
    { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', price: 248.5, change: -8.45, changePercent: -3.29, marketCap: '789B', volume: '95.1M', pe: 65.2, dividend: 0 },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', type: 'etf', price: 445.2, change: 1.85, changePercent: 0.42, volume: '78.5M' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'etf', price: 378.92, change: 0.95, changePercent: 0.25, volume: '42.1M' },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market', type: 'etf', price: 232.45, change: 1.12, changePercent: 0.48, volume: '3.2M' },
    { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', price: 43250.0, change: 1250.5, changePercent: 2.98 },
    { symbol: 'ETH', name: 'Ethereum', type: 'crypto', price: 2587.3, change: -89.45, changePercent: -3.34 },
    { symbol: 'TLT', name: 'iShares 20+ Year Treasury', type: 'bond', price: 91.25, change: -0.35, changePercent: -0.38, dividend: 3.2 },
]

export const generatePriceHistory = (symbol: string, days: number = 30): { date: string; price: number }[] => {
    const investment = mockInvestments.find((inv) => inv.symbol === symbol)
    if (!investment) return []

    const history = []
    let currentPrice = investment.price

    for (let i = days; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)

        const volatility = investment.type === 'crypto' ? 0.05 : investment.type === 'stock' ? 0.02 : 0.01
        const dailyChange = (Math.random() - 0.5) * 2 * volatility
        currentPrice *= 1 + dailyChange

        history.push({
            date: date.toISOString().split('T')[0],
            price: Math.round(currentPrice * 100) / 100,
        })
    }

    return history
}

export const calculatePortfolioMetrics = (
    holdings: PortfolioHolding[]
): {
    totalValue: number
    totalReturn: number
    totalReturnPercent: number
    topPerformer: PortfolioHolding | null
    worstPerformer: PortfolioHolding | null
} => {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0)
    const totalReturn = holdings.reduce((sum, holding) => sum + holding.totalReturn, 0)
    const totalReturnPercent = totalValue > 0 ? (totalReturn / (totalValue - totalReturn)) * 100 : 0

    const sortedByReturn = [...holdings].sort((a, b) => b.totalReturnPercent - a.totalReturnPercent)

    return {
        totalValue,
        totalReturn,
        totalReturnPercent,
        topPerformer: sortedByReturn[0] || null,
        worstPerformer: sortedByReturn[sortedByReturn.length - 1] || null,
    }
}
