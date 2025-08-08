'use client'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Monitor, Play, Smartphone, Tablet } from 'lucide-react'

export default function DemoSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            See PockFin in
                            <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent"> Action</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Watch how our platform transforms complex financial concepts into interactive, easy-to-understand simulations that help you make better financial decisions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                                <Play className="mr-2 h-5 w-5" />
                                Watch Demo Video
                            </Button>
                            <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                                Try Live Demo
                            </Button>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Monitor className="h-5 w-5 mr-2 text-emerald-600" />
                                Desktop
                            </div>
                            <div className="flex items-center">
                                <Tablet className="h-5 w-5 mr-2 text-emerald-600" />
                                Tablet
                            </div>
                            <div className="flex items-center">
                                <Smartphone className="h-5 w-5 mr-2 text-emerald-600" />
                                Mobile
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Play className="h-12 w-12 text-white" />
                                </div>
                                <p className="text-gray-600 text-lg">Demo Video Placeholder</p>
                                <p className="text-gray-500 text-sm mt-2">Interactive product demo coming soon</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
