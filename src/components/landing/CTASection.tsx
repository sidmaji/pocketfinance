'use client'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <div className="flex justify-center mb-6">
                        <Sparkles className="h-16 w-16 text-emerald-400" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Ready to Transform Your
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Financial Future?</span>
                    </h2>

                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Join the next generation of financially literate individuals. Start your simulation today - it's free!</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                            onClick={() => (window.location.href = '/register')}
                        >
                            Start Your Free Journey
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-slate-900">
                            Learn More
                        </Button>
                    </div>

                    <p className="text-gray-400 mt-6">No credit card required • Free forever • Upgrade anytime</p>
                </motion.div>
            </div>
        </section>
    )
}
