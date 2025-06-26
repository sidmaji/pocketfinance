'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import ModuleCard from '@/components/education/ModuleCard'
import ProgressDashboard from '@/components/education/ProgressDashboard'
import { mockLearningModules } from '@/lib/educationData'
import { Award, BookOpen, Target } from 'lucide-react'
import { useState } from 'react'

export default function EducationPage() {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const progressStats = {
        completedLessons: 3,
        totalLessons: 14,
        completedModules: 1,
        totalModules: 4,
        streakDays: 5,
        totalPoints: 750,
        badges: ['budgeting-basics'],
    }

    const categories = [
        { id: 'all', name: 'All Topics', count: mockLearningModules.length },
        { id: 'budgeting', name: 'Budgeting', count: 1 },
        { id: 'investing', name: 'Investing', count: 1 },
        { id: 'saving', name: 'Saving', count: 1 },
        { id: 'retirement', name: 'Retirement', count: 1 },
    ]

    const filteredModules = selectedCategory === 'all' ? mockLearningModules : mockLearningModules.filter((module) => module.lessons.some((lesson) => lesson.category === selectedCategory))

    const handleStartModule = (moduleId: string) => {
        window.location.href = `/dashboard/education/module/${moduleId}`
    }

    return (
        <ProtectedRoute>
            <DashboardLayout title="Financial Education">
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Financial Education Center</h2>
                        <p className="text-green-100">Build your financial knowledge with interactive lessons, quizzes, and real-world applications. Learn at your own pace and track your progress.</p>
                    </div>

                    <ProgressDashboard stats={progressStats} />

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-6">Learning Modules</h3>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        selectedCategory === category.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category.name} ({category.count})
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredModules.map((module) => (
                                <ModuleCard key={module.id} module={module} onStart={handleStartModule} />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Learning Tips</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-blue-800">Take Notes</h4>
                                        <p className="text-sm text-blue-700">Write down key concepts as you learn</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-green-800">Practice Daily</h4>
                                        <p className="text-sm text-green-700">Consistency is key to building knowledge</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Award className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-purple-800">Apply Learning</h4>
                                        <p className="text-sm text-purple-700">Use simulators to practice concepts</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-green-800">Budget Adjustments</p>
                                        <p className="text-sm text-green-600">Completed yesterday</p>
                                    </div>
                                    <Award className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-blue-800">Investment Types</p>
                                        <p className="text-sm text-blue-600">In progress</p>
                                    </div>
                                    <div className="w-16 h-2 bg-blue-200 rounded-full">
                                        <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Recommended Next</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <h4 className="font-medium text-purple-800">Types of Investments</h4>
                                    <p className="text-sm text-purple-600 mb-2">Learn about stocks, bonds, and ETFs</p>
                                    <div className="flex items-center text-xs text-purple-500">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        <span>18 min</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <h4 className="font-medium text-orange-800">Emergency Fund</h4>
                                    <p className="text-sm text-orange-600 mb-2">Build your financial safety net</p>
                                    <div className="flex items-center text-xs text-orange-500">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        <span>15 min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}
