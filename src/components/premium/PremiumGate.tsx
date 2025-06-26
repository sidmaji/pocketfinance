'use client'
import Button from '@/components/ui/Button'
import { checkFeatureAccess } from '@/lib/premiumFeatures'
import { Crown, Sparkles } from 'lucide-react'
import { ReactNode } from 'react'

interface PremiumGateProps {
    featureId: string
    featureName: string
    children: ReactNode
    userPlan?: string
    fallback?: ReactNode
}

export default function PremiumGate({ featureId, featureName, children, userPlan = 'free', fallback }: PremiumGateProps) {
    const hasAccess = checkFeatureAccess(featureId, userPlan)

    if (hasAccess) {
        return <>{children}</>
    }

    if (fallback) {
        return <>{fallback}</>
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-md text-center border-2 border-purple-200">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Crown className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Feature</h3>
                    <p className="text-gray-600 mb-4">{featureName} is available with PocketFin Premium</p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-purple-600 font-medium">Unlock advanced features</span>
                    </div>
                    <Button onClick={() => (window.location.href = '/pricing')} className="w-full">
                        Upgrade Now
                    </Button>
                </div>
            </div>
            <div className="filter blur-sm pointer-events-none">{children}</div>
        </div>
    )
}
