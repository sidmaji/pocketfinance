'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import PortfolioBuilder from '@/components/investments/PortfolioBuilder'
import PortfolioSummary from '@/components/investments/PortfolioSummary'
import { PortfolioHolding } from '@/lib/mockData'
import { PieChart, Target, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function InvestmentsPage() {
    const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([])
    const [cash, setCash] = useState(10000)

    return (
        <ProtectedRoute>
            <DashboardLayout title="Investment Sandbox">
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Investment Sandbox</h2>
                        <p className="text-blue-100">Build and track investment portfolios with real-time simulations. Learn about asset allocation, risk management, and performance tracking.</p>
                    </div>

                    <PortfolioSummary holdings={portfolio} cash={cash} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PortfolioBuilder portfolio={portfolio} onUpdatePortfolio={setPortfolio} cash={cash} onUpdateCash={setCash} />

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Investment Tips</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <PieChart className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800">Diversification</h4>
                                        <p className="text-sm text-blue-700">Spread your investments across different asset classes to reduce risk.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-green-800">Long-term Thinking</h4>
                                        <p className="text-sm text-green-700">Focus on long-term growth rather than short-term market fluctuations.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-purple-800">Regular Review</h4>
                                        <p className="text-sm text-purple-700">Regularly review and rebalance your portfolio to maintain your target allocation.</p>
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
