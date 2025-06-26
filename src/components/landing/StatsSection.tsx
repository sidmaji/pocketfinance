'use client'
import { motion } from 'framer-motion'
import { BookOpen, Target, TrendingUp, UserPlus } from 'lucide-react'

const steps = [
    {
        icon: UserPlus,
        title: 'Sign Up',
        description: 'Create your free account and set up your financial profile to get started.',
        step: '01',
    },
    {
        icon: BookOpen,
        title: 'Learn & Practice',
        description: 'Taking interactive lessons and practice with our financial simulation tools.',
        step: '02',
    },
    {
        icon: TrendingUp,
        title: 'Build Your Portfolio',
        description: 'Use our investment sandbox to build and test different portfolio strategies.',
        step: '03',
    },
    {
        icon: Target,
        title: 'Plan Your Future',
        description: 'Set financial goals and create actionable plans to achieve them.',
        step: '04',
    },
]

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-green-600/10 animate-gradient-x"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        How
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> PocketFin Works</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">Start your financial literacy journey in four simple steps.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center relative"
                        >
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-emerald-400/20">
                                <div className="text-emerald-400 text-lg font-bold mb-4">{step.step}</div>
                                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <step.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{step.description}</p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transform -translate-y-1/2"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
