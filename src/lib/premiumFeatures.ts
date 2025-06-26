export interface PremiumFeature {
    id: string
    name: string
    description: string
    category: 'simulation' | 'investment' | 'education' | 'ai' | 'export'
    requiredPlan: 'free' | 'premium' | 'pro'
}

export const premiumFeatures: PremiumFeature[] = [
    {
        id: 'advanced-simulations',
        name: 'Advanced Financial Simulations',
        description: 'Complex life event modeling with multiple scenarios',
        category: 'simulation',
        requiredPlan: 'premium',
    },
    {
        id: 'unlimited-portfolios',
        name: 'Unlimited Portfolio Tracking',
        description: 'Track multiple investment portfolios simultaneously',
        category: 'investment',
        requiredPlan: 'premium',
    },
    {
        id: 'ai-financial-advisor',
        name: 'AI Financial Advisor',
        description: 'Personalized financial advice powered by AI',
        category: 'ai',
        requiredPlan: 'premium',
    },
    {
        id: 'advanced-analytics',
        name: 'Advanced Analytics & Reports',
        description: 'Detailed financial analytics and custom reports',
        category: 'export',
        requiredPlan: 'premium',
    },
    {
        id: 'priority-support',
        name: 'Priority Customer Support',
        description: '24/7 priority support via chat and email',
        category: 'education',
        requiredPlan: 'premium',
    },
    {
        id: 'ai-investment-insights',
        name: 'AI Investment Insights',
        description: 'AI-powered investment recommendations and market analysis',
        category: 'ai',
        requiredPlan: 'pro',
    },
    {
        id: 'tax-optimization',
        name: 'Tax Optimization Tools',
        description: 'Advanced tax planning and optimization strategies',
        category: 'simulation',
        requiredPlan: 'pro',
    },
]

export const checkFeatureAccess = (featureId: string, userPlan: string = 'free'): boolean => {
    const feature = premiumFeatures.find((f) => f.id === featureId)
    if (!feature) return true

    const planHierarchy = { free: 0, premium: 1, pro: 2 }
    const userLevel = planHierarchy[userPlan as keyof typeof planHierarchy] || 0
    const requiredLevel = planHierarchy[feature.requiredPlan as keyof typeof planHierarchy] || 0

    return userLevel >= requiredLevel
}
