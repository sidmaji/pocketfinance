'use client'
import { SimulationResult } from '@/lib/simulationEngine'
import { AlertTriangle, DollarSign, Target, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface SimulationResultsProps {
    results: SimulationResult[]
    retirementAge: number
}

export default function SimulationResults({ results, retirementAge }: SimulationResultsProps) {
    const retirementResult = results.find((r) => r.age === retirementAge)
    const finalResult = results[results.length - 1]
    const recommendedRetirementAmount = retirementResult ? retirementResult.expenses * 25 : 0
    const isRetirementReady = retirementResult ? retirementResult.netWorth >= recommendedRetirementAmount : false

    const formatCurrency = (value: number) => `$${value.toLocaleString()}`

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Net Worth at Retirement</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(retirementResult?.netWorth || 0)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Final Net Worth</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(finalResult.netWorth)}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Savings</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(finalResult.cumulativeSavings)}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Retirement Status</p>
                            <p className={`text-lg font-bold ${isRetirementReady ? 'text-green-600' : 'text-red-600'}`}>{isRetirementReady ? 'On Track' : 'Behind'}</p>
                        </div>
                        <div className={`w-12 h-12 ${isRetirementReady ? 'bg-green-500' : 'bg-red-500'} rounded-lg flex items-center justify-center`}>
                            {isRetirementReady ? <Target className="h-6 w-6 text-white" /> : <AlertTriangle className="h-6 w-6 text-white" />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Net Worth Projection</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Net Worth']} />
                        <Area type="monotone" dataKey="netWorth" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={results.slice(0, 20)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Life Events Timeline</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {results
                            .filter((r) => r.events.length > 0)
                            .map((result, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">{result.age}</div>
                                    <div>
                                        <p className="font-medium">{result.events.join(', ')}</p>
                                        <p className="text-sm text-gray-600">Net Worth: {formatCurrency(result.netWorth)}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {!isRetirementReady && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                        <div>
                            <h4 className="text-lg font-semibold text-yellow-800 mb-2">Retirement Shortfall Detected</h4>
                            <p className="text-yellow-700 mb-3">
                                Based on the 25x rule, you need {formatCurrency(recommendedRetirementAmount)} for retirement, but your projection shows{' '}
                                {formatCurrency(retirementResult?.netWorth || 0)}.
                            </p>
                            <p className="text-sm text-yellow-600">Consider increasing your savings rate or investment returns to reach your retirement goals.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
