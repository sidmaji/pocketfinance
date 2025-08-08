'use client'
import Button from '@/components/ui/Button'
import { Menu, TrendingUp, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl bg-white/90 backdrop-blur-md z-50 border border-gray-200 rounded-2xl shadow-lg">
            <div className="px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">PockFin</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            Features
                        </a>
                        <a href="#education" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            Education
                        </a>
                        <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            Pricing
                        </a>
                        <a href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            About
                        </a>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" onClick={() => (window.location.href = '/login')} className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50">
                            Sign In
                        </Button>
                        <Button
                            onClick={() => (window.location.href = '/register')}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-none"
                        >
                            Get Started
                        </Button>
                    </div>

                    <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium">
                                Features
                            </a>
                            <a href="#education" className="text-gray-700 hover:text-emerald-600 font-medium">
                                Education
                            </a>
                            <a href="#pricing" className="text-gray-700 hover:text-emerald-600 font-medium">
                                Pricing
                            </a>
                            <a href="/about" className="text-gray-700 hover:text-emerald-600 font-medium">
                                About
                            </a>
                            <div className="flex flex-col space-y-2 pt-4">
                                <Button variant="ghost" onClick={() => (window.location.href = '/login')} className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50">
                                    Sign In
                                </Button>
                                <Button onClick={() => (window.location.href = '/register')} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
