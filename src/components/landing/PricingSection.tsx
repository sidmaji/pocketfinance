'use client'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started with financial literacy',
        features: ['Basic financial simulator', 'Educational content library', 'Simple portfolio tracker', 'Goal setting tools', 'Community access'],
        buttonText: 'Get Started Free',
        popular: false,
    },
    {
        name: 'Premium',
        price: '$5',
        period: 'per month',
        description: 'AI-powered insights and advanced features',
        features: [
            'Everything in Free',
            'Unlimited financial simulations',
            'AI Financial Advisor',
            'AI Investment Insights',
            'Advanced portfolio analytics',
            'Export & sharing features',
            'Priority customer support',
            'Advanced risk assessment',
        ],
        buttonText: 'Upgrade to Premium',
        popular: true,
    },
]

export default function PricingSection() {
    return (
        <section id="pricing" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Choose Your
                        <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent"> Learning Path</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Start free and upgrade when you're ready for AI-powered insights. No hidden fees, cancel anytime.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                                        <Star className="h-4 w-4 mr-1" />
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div
                                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 ${
                                    plan.popular ? 'border-2 border-emerald-500 lg:scale-105' : 'border border-gray-200'
                                }`}
                            >
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-600 ml-2">/{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'} onClick={() => (window.location.href = plan.name === 'Free' ? '/register' : '/pricing')}>
                                    {plan.buttonText}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
