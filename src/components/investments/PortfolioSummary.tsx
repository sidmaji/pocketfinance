'use client'
import { PortfolioHolding, calculatePortfolioMetrics } from '@/lib/mockData'
import { DollarSign, Target, TrendingDown, TrendingUp } from 'lucide-react'
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface PortfolioSummaryProps {
    holdings: PortfolioHolding[]
    cash: number
}

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

export default function PortfolioSummary({ holdings, cash }: PortfolioSummaryProps) {
    const metrics = calculatePortfolioMetrics(holdings)
    const totalValue = metrics.totalValue + cash

    const allocationData = [
        ...holdings.map((holding, index) => ({
            name: holding.symbol,
            value: holding.currentValue,
            color: COLORS[index % COLORS.length],
        })),
        ...(cash > 0 ? [{ name: 'Cash', value: cash, color: '#9ca3af' }] : []),
    ]

    const performanceData = [
        { name: 'Jan', value: totalValue * 0.85 },
        { name: 'Feb', value: totalValue * 0.88 },
        { name: 'Mar', value: totalValue * 0.92 },
        { name: 'Apr', value: totalValue * 0.87 },
        { name: 'May', value: totalValue * 0.95 },
        { name: 'Jun', value: totalValue },
    ]

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Value</p>
                            <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Return</p>
                            <p className={`text-2xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>${metrics.totalReturn.toLocaleString()}</p>
                        </div>
                        <div className={`w-12 h-12 ${metrics.totalReturn >= 0 ? 'bg-green-500' : 'bg-red-500'} rounded-lg flex items-center justify-center`}>
                            {metrics.totalReturn >= 0 ? <TrendingUp className="h-6 w-6 text-white" /> : <TrendingDown className="h-6 w-6 text-white" />}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Return %</p>
                            <p className={`text-2xl font-bold ${metrics.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {metrics.totalReturnPercent >= 0 ? '+' : ''}
                                {metrics.totalReturnPercent.toFixed(1)}%
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Holdings</p>
                            <p className="text-2xl font-bold text-gray-900">{holdings.length}</p>
                            <p className="text-xs text-gray-500">+ ${cash.toLocaleString()} cash</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
                    {allocationData.length > 0 ? (
                        <div className="flex items-center">
                            <ResponsiveContainer width="60%" height={200}>
                                <PieChart>
                                    <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                                        {allocationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex-1 space-y-2">
                                {allocationData.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-sm font-medium">{item.name}</span>
                                        <span className="text-sm text-gray-600">{((item.value / totalValue) * 100).toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No allocation data available</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Performance</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={performanceData}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']} />
                            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {holdings.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Top Performer</h3>
                        {metrics.topPerformer && (
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-green-800">{metrics.topPerformer.symbol}</p>
                                    <p className="text-sm text-green-600">{metrics.topPerformer.shares} shares</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-green-800">+{metrics.topPerformer.totalReturnPercent.toFixed(1)}%</p>
                                    <p className="text-sm text-green-600">+${metrics.topPerformer.totalReturn.toFixed(0)}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Needs Attention</h3>
                        {metrics.worstPerformer && (
                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-red-800">{metrics.worstPerformer.symbol}</p>
                                    <p className="text-sm text-red-600">{metrics.worstPerformer.shares} shares</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-red-800">{metrics.worstPerformer.totalReturnPercent.toFixed(1)}%</p>
                                    <p className="text-sm text-red-600">${metrics.worstPerformer.totalReturn.toFixed(0)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
