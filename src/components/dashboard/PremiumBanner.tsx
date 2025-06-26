'use client'
import Button from '@/components/ui/Button'
import { Crown, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

interface PremiumBannerProps {
    userPlan?: string
}

export default function PremiumBanner({ userPlan = 'free' }: PremiumBannerProps) {
    const [isVisible, setIsVisible] = useState(true)

    if (userPlan !== 'free' || !isVisible) {
        return null
    }

    return (
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-4 mb-6 relative">
            <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-white/80 hover:text-white">
                <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Unlock Premium Features</h3>
                    <p className="text-purple-100 text-sm">Get unlimited simulations, advanced analytics, and AI-powered insights</p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center text-white/90 text-sm">
                        <Sparkles className="h-4 w-4 mr-1" />
                        <span>Save 17% yearly</span>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => (window.location.href = '/pricing')}>
                        Upgrade Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
