'use client'
import { motion } from 'framer-motion'
import { Calculator, GraduationCap, PieChart, Shield, Target, TrendingUp } from 'lucide-react'

const features = [
    {
        icon: Calculator,
        title: 'Financial Simulation Engine',
        description: 'Model major life events like college, home purchases, and retirement with powerful projection tools.',
        color: 'from-emerald-500 to-teal-600',
    },
    {
        icon: TrendingUp,
        title: 'Investment Sandbox',
        description: 'Build portfolios, backtest strategies, and learn investing with real market data and simulations.',
        color: 'from-teal-500 to-cyan-600',
    },
    {
        icon: GraduationCap,
        title: 'Educational Content',
        description: 'Interactive learning modules with comprehensive lessons, quizzes, and achievement tracking.',
        color: 'from-green-500 to-emerald-600',
    },
    {
        icon: Target,
        title: 'Goal-Based Planning',
        description: 'Set and track financial goals with smart recommendations and milestone celebrations.',
        color: 'from-emerald-600 to-green-600',
    },
    {
        icon: PieChart,
        title: 'Advanced Analytics',
        description: 'Comprehensive reporting, risk assessment, and performance tracking against benchmarks.',
        color: 'from-teal-600 to-emerald-600',
    },
    {
        icon: Shield,
        title: 'Risk Management',
        description: 'Learn about different types of risk and how to build resilient financial strategies.',
        color: 'from-cyan-500 to-teal-600',
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-gradient-to-b from-white to-emerald-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need to
                        <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent"> Master Finance</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From basic budgeting to advanced investment strategies, PocketFin provides comprehensive tools for learners at every level.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-emerald-100">
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
