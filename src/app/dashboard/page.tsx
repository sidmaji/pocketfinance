'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import PremiumBanner from '@/components/dashboard/PremiumBanner'
import StatCard from '@/components/dashboard/StatCard'
import PremiumGate from '@/components/premium/PremiumGate'
import { Activity, BookOpen, DollarSign, PieChart, Target, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const netWorthData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 47000 },
    { month: 'Mar', value: 48500 },
    { month: 'Apr', value: 51000 },
    { month: 'May', value: 53500 },
    { month: 'Jun', value: 56000 },
]

const expenseData = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 5200, expenses: 3600 },
    { month: 'Mar', income: 5100, expenses: 3400 },
    { month: 'Apr', income: 5300, expenses: 3700 },
    { month: 'May', income: 5400, expenses: 3800 },
    { month: 'Jun', income: 5500, expenses: 3900 },
]

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout title="Dashboard">
                <div className="space-y-6">
                    <PremiumBanner userPlan="free" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Net Worth" value="$56,000" change="+4.5% from last month" changeType="positive" icon={DollarSign} iconColor="bg-green-500" />
                        <StatCard title="Portfolio Value" value="$23,450" change="+2.3% from last month" changeType="positive" icon={TrendingUp} iconColor="bg-blue-500" />
                        <StatCard title="Monthly Savings" value="$1,600" change="+12% from last month" changeType="positive" icon={Target} iconColor="bg-purple-500" />
                        <StatCard title="Lessons Completed" value="12" change="3 this week" changeType="neutral" icon={BookOpen} iconColor="bg-orange-500" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Worth Progression</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={netWorthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Net Worth']} />
                                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <PremiumGate featureId="advanced-analytics" featureName="Advanced Analytics" userPlan="free">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Analytics</h3>
                                <div className="text-center py-8 text-gray-500">
                                    <p>Advanced analytics and insights would appear here</p>
                                </div>
                            </div>
                        </PremiumGate>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a href="/dashboard/simulator" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Activity className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <span className="font-medium">Run Financial Simulation</span>
                                    </div>
                                </a>
                                <a href="/dashboard/investments" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <PieChart className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <span className="font-medium">Build Portfolio</span>
                                    </div>
                                </a>
                                <a href="/dashboard/education" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <BookOpen className="h-4 w-4 text-green-600" />
                                        </div>
                                        <span className="font-medium">Continue Learning</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Goals</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">Emergency Fund</p>
                                        <p className="text-sm text-gray-500">$8,000 / $10,000</p>
                                    </div>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">House Down Payment</p>
                                        <p className="text-sm text-gray-500">$15,000 / $50,000</p>
                                    </div>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-1/3 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">Vacation Fund</p>
                                        <p className="text-sm text-gray-500">$2,500 / $5,000</p>
                                    </div>
                                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                                        <div className="w-1/2 h-2 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Budgeting Basics</span>
                                        <span className="text-sm text-gray-500">100%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div className="w-full h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Investment Fundamentals</span>
                                        <span className="text-sm text-gray-500">75%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Retirement Planning</span>
                                        <span className="text-sm text-gray-500">25%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div className="w-1/4 h-2 bg-purple-500 rounded-full"></div>
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
