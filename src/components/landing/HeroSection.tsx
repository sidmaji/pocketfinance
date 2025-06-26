'use client'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-green-600/20 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-slate-800/50 via-transparent to-emerald-800/50 animate-gradient-xy"></div>

            {/* Pattern overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23047857' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            ></div>

            {/* Floating elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Master Your
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Financial Future</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                        Powerful personal finance simulations and literacy tools for all ages. Learn through interactive experiences, plan major life events, and build wealth confidently.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-none"
                            onClick={() => (window.location.href = '/register')}
                        >
                            Start Your Journey
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
                            <Play className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-gray-400">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-white mr-2">10K+</span>
                            <span>Active Users</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-white mr-2">$2M+</span>
                            <span>Simulated Portfolios</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-white mr-2">95%</span>
                            <span>Success Rate</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                <div className="animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
