'use client'
import { Award, BookOpen, Calendar, TrendingUp } from 'lucide-react'

interface ProgressStats {
    completedLessons: number
    totalLessons: number
    completedModules: number
    totalModules: number
    streakDays: number
    totalPoints: number
    badges: string[]
}

interface ProgressDashboardProps {
    stats: ProgressStats
}

export default function ProgressDashboard({ stats }: ProgressDashboardProps) {
    const completionPercentage = (stats.completedLessons / stats.totalLessons) * 100

    const achievements = [
        { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: stats.completedLessons >= 1 },
        { id: 'budgeting-master', name: 'Budgeting Master', description: 'Complete budgeting module', icon: '💰', earned: stats.badges.includes('budgeting-basics') },
        { id: 'investor', name: 'Investor', description: 'Complete investment module', icon: '📈', earned: stats.badges.includes('investment-fundamentals') },
        { id: 'streak-7', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: stats.streakDays >= 7 },
        { id: 'completionist', name: 'Completionist', description: 'Complete all modules', icon: '🏆', earned: stats.completedModules === stats.totalModules },
    ]

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.completedLessons}</p>
                            <p className="text-xs text-gray-500">of {stats.totalLessons} total</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Modules Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.completedModules}</p>
                            <p className="text-xs text-gray-500">of {stats.totalModules} total</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <Award className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.streakDays}</p>
                            <p className="text-xs text-gray-500">days in a row</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Points</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
                            <p className="text-xs text-gray-500">knowledge points</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                        <span className="text-sm text-gray-500">{completionPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-primary h-3 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${achievement.earned ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>{achievement.icon}</div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>{achievement.name}</h4>
                                    <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>{achievement.description}</p>
                                </div>
                                {achievement.earned && <Award className="h-5 w-5 text-green-600" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
