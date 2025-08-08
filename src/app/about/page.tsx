'use client'
import Button from '@/components/ui/Button'
import { Heart, Lightbulb, Target, Users } from 'lucide-react'

export default function AboutPage() {
    const values = [
        {
            icon: Target,
            title: 'Accessibility',
            description: 'Financial education should be available to everyone, regardless of background or experience level.',
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'We use cutting-edge technology to make financial learning interactive and engaging.',
        },
        {
            icon: Heart,
            title: 'Empowerment',
            description: 'We believe knowledge leads to confidence, and confidence leads to better financial decisions.',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Learning together makes us all stronger. We foster a supportive community of learners.',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-primary p-2 rounded-lg">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold gradient-text">PockFin</span>
                        </div>
                        <div className="flex space-x-4">
                            <Button variant="outline" onClick={() => (window.location.href = '/')}>
                                Home
                            </Button>
                            <Button onClick={() => (window.location.href = '/auth/register')}>Get Started</Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About
                        <span className="gradient-text"> PockFin</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We're on a mission to make financial literacy accessible, engaging, and practical for everyone. Through interactive simulations and comprehensive education, we empower people
                        to take control of their financial future.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Financial literacy is one of the most important life skills, yet it's rarely taught effectively. Traditional financial education often feels abstract and disconnected from real
                        life. We created PockFin to change that.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our platform combines powerful financial simulation tools with comprehensive educational content to create an engaging learning experience. Whether you're planning for
                        retirement, buying your first home, or learning to invest, PockFin helps you understand the impact of your decisions before you make them.
                    </p>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                                    <value.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Financial Future?</h2>
                    <p className="text-purple-100 mb-6 text-lg">Join thousands of learners who are already building financial confidence with PockFin.</p>
                    <Button size="lg" variant="secondary" onClick={() => (window.location.href = '/auth/register')}>
                        Start Your Journey Today
                    </Button>
                </div>
            </main>
        </div>
    )
}
