'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import GoalPlanner from '@/components/tools/GoalPlanner'
import LoanAnalyzer from '@/components/tools/LoanAnalyzer'
import RiskAssessment from '@/components/tools/RiskAssessment'
import { useState } from 'react'

export default function GoalsPage() {
    const [activeTab, setActiveTab] = useState('goals')

    const tabs = [
        { id: 'goals', name: 'Financial Goals', icon: '🎯' },
        { id: 'loans', name: 'Loan Analyzer', icon: '🏦' },
        { id: 'risk', name: 'Risk Assessment', icon: '⚖️' },
    ]

    return (
        <ProtectedRoute>
            <DashboardLayout title="Advanced Tools">
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Advanced Financial Tools</h2>
                        <p className="text-orange-100">Use sophisticated tools to plan your financial future, analyze debt, and assess investment risk.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === tab.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="mr-2">{tab.icon}</span>
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'goals' && <GoalPlanner />}
                            {activeTab === 'loans' && <LoanAnalyzer />}
                            {activeTab === 'risk' && <RiskAssessment />}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}
