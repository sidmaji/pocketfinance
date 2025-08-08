'use client'
import Button from '@/components/ui/Button'
import { Check, Crown, Sparkles, Star } from 'lucide-react'
import { useState } from 'react'

export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

    const plans = [
        {
            name: 'Free',
            price: { monthly: 0, yearly: 0 },
            description: 'Perfect for getting started with financial literacy',
            popular: false,
            icon: Sparkles,
            color: 'from-gray-500 to-gray-600',
            features: ['Basic financial simulator', 'Educational content library', 'Simple portfolio tracker', 'Goal setting tools', 'Community access', 'Basic budgeting tools'],
            limitations: ['Limited to 3 simulations per month', 'Basic investment tracking', 'Standard support'],
        },
        {
            name: 'Premium',
            price: { monthly: 5.0, yearly: 50.0 },
            description: 'AI-powered insights and advanced features',
            popular: true,
            icon: Crown,
            color: 'from-emerald-500 to-teal-600',
            features: [
                'Everything in Free',
                'Unlimited financial simulations',
                'AI Financial Advisor',
                'AI Investment Insights',
                'Advanced portfolio analytics',
                'Risk assessment tools',
                'Export & sharing features',
                'Priority customer support',
                'Advanced analytics dashboard',
                'Goal progress tracking',
                'Loan analyzer tools',
            ],
            limitations: [],
        },
    ]

    const handleUpgrade = (planName: string) => {
        if (planName === 'Free') {
            window.location.href = '/register'
        } else {
            alert(`${planName} upgrade coming soon! Payment integration will be added later.`)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">PockFin</span>
                        </div>
                        <div className="flex space-x-4">
                            <Button variant="outline" onClick={() => (window.location.href = '/login')}>
                                Sign In
                            </Button>
                            <Button onClick={() => (window.location.href = '/register')} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Choose Your
                        <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent"> Financial Journey</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Start free and upgrade when you're ready for AI-powered features. No hidden fees, cancel anytime.</p>

                    <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                billingPeriod === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                billingPeriod === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Yearly
                            <span className="ml-1 text-xs text-green-600 font-semibold">Save 17%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-emerald-500 lg:scale-105' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                                        <Star className="h-4 w-4 mr-1" />
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center`}>
                                        <plan.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                        <p className="text-gray-600">{plan.description}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-gray-900">${plan.price[billingPeriod]}</span>
                                        <span className="text-gray-600 ml-2">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                                    </div>
                                    {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                                        <p className="text-sm text-green-600 mt-1">Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year</p>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.limitations.map((limitation, limitIndex) => (
                                        <li key={limitIndex} className="flex items-start">
                                            <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-500 text-sm">{limitation}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button onClick={() => handleUpgrade(plan.name)} className="w-full" variant={plan.popular ? 'primary' : 'outline'} size="lg">
                                    {plan.name === 'Free' ? 'Get Started Free' : `Upgrade to ${plan.name}`}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                            <p className="text-gray-600">Our free plan includes core features forever. Premium plans will offer a 14-day free trial.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers (coming soon).</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Is my financial data secure?</h3>
                            <p className="text-gray-600">Yes, we use bank-level security encryption and never store sensitive financial account information.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your financial journey?</h2>
                    <p className="text-gray-600 mb-8">Join the next generation of financially literate individuals.</p>
                    <Button size="lg" onClick={() => (window.location.href = '/register')} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                        Start Free Today
                    </Button>
                </div>
            </main>
        </div>
    )
}
