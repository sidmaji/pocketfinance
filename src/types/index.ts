export interface User {
    id: string
    email: string
    displayName?: string
    photoURL?: string
    isPremium: boolean
    createdAt: Date
    lastLogin: Date
}

export interface FinancialData {
    userId: string
    income: number
    expenses: number
    assets: number
    liabilities: number
    netWorth: number
    lastUpdated: Date
}

export interface SimulationScenario {
    id: string
    userId: string
    name: string
    description?: string
    startingAge: number
    retirementAge: number
    initialNetWorth: number
    monthlyIncome: number
    monthlyExpenses: number
    inflationRate: number
    investmentReturn: number
    createdAt: Date
    updatedAt: Date
}

export interface Investment {
    id: string
    symbol: string
    name: string
    type: 'stock' | 'etf' | 'crypto' | 'bond'
    price: number
    change: number
    changePercent: number
}

export interface Portfolio {
    id: string
    userId: string
    name: string
    holdings: PortfolioHolding[]
    totalValue: number
    totalReturn: number
    totalReturnPercent: number
}

export interface PortfolioHolding {
    investmentId: string
    symbol: string
    shares: number
    averageCost: number
    currentValue: number
    totalReturn: number
    totalReturnPercent: number
}
