'use client'
import Button from '@/components/ui/Button'
import { AlertTriangle, Calculator, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface LoanData {
    principal: number
    interestRate: number
    termYears: number
    loanType: string
}

interface LoanResult {
    monthlyPayment: number
    totalInterest: number
    totalPayment: number
    debtType: 'good' | 'bad' | 'neutral'
    recommendation: string
}

export default function LoanAnalyzer() {
    const [loanData, setLoanData] = useState<LoanData>({
        principal: 250000,
        interestRate: 6.5,
        termYears: 30,
        loanType: 'mortgage',
    })

    const [result, setResult] = useState<LoanResult | null>(null)

    const calculateLoan = () => {
        const monthlyRate = loanData.interestRate / 100 / 12
        const numPayments = loanData.termYears * 12

        const monthlyPayment = (loanData.principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)

        const totalPayment = monthlyPayment * numPayments
        const totalInterest = totalPayment - loanData.principal

        const debtType = classifyDebt(loanData.loanType, loanData.interestRate)
        const recommendation = getRecommendation(debtType, loanData.interestRate)

        setResult({
            monthlyPayment,
            totalInterest,
            totalPayment,
            debtType,
            recommendation,
        })
    }

    const classifyDebt = (loanType: string, rate: number): 'good' | 'bad' | 'neutral' => {
        if (loanType === 'mortgage' || loanType === 'student') return 'good'
        if (loanType === 'credit-card' || rate > 15) return 'bad'
        if (loanType === 'auto' || loanType === 'personal') return 'neutral'
        return 'neutral'
    }

    const getRecommendation = (debtType: string, rate: number): string => {
        switch (debtType) {
            case 'good':
                return 'This is generally considered good debt as it can build wealth or improve earning potential. Consider making regular payments while investing extra funds.'
            case 'bad':
                return 'This high-interest debt should be prioritized for early payoff. Consider debt consolidation or aggressive payment strategies.'
            case 'neutral':
                return 'Evaluate whether to pay off early or invest the extra payments based on potential investment returns vs. interest rate.'
            default:
                return 'Review the terms and consider your overall financial strategy.'
        }
    }

    const getDebtTypeColor = (debtType: string) => {
        switch (debtType) {
            case 'good':
                return 'text-green-600 bg-green-100'
            case 'bad':
                return 'text-red-600 bg-red-100'
            case 'neutral':
                return 'text-yellow-600 bg-yellow-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const getDebtTypeIcon = (debtType: string) => {
        switch (debtType) {
            case 'good':
                return <CheckCircle className="h-5 w-5" />
            case 'bad':
                return <AlertTriangle className="h-5 w-5" />
            default:
                return <Calculator className="h-5 w-5" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Analyzer</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
                            <select
                                value={loanData.loanType}
                                onChange={(e) => setLoanData((prev) => ({ ...prev, loanType: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="mortgage">Mortgage</option>
                                <option value="auto">Auto Loan</option>
                                <option value="personal">Personal Loan</option>
                                <option value="student">Student Loan</option>
                                <option value="credit-card">Credit Card</option>
                                <option value="business">Business Loan</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount ($)</label>
                            <input
                                type="number"
                                value={loanData.principal}
                                onChange={(e) => setLoanData((prev) => ({ ...prev, principal: Number(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={loanData.interestRate}
                                onChange={(e) => setLoanData((prev) => ({ ...prev, interestRate: Number(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Years)</label>
                            <input
                                type="number"
                                value={loanData.termYears}
                                onChange={(e) => setLoanData((prev) => ({ ...prev, termYears: Number(e.target.value) }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <Button onClick={calculateLoan} className="w-full">
                            <Calculator className="h-4 w-4 mr-2" />
                            Analyze Loan
                        </Button>
                    </div>

                    {result && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Monthly Payment</p>
                                    <p className="text-2xl font-bold text-gray-900">${result.monthlyPayment.toLocaleString()}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Interest</p>
                                    <p className="text-xl font-semibold text-gray-900">${result.totalInterest.toLocaleString()}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Payment</p>
                                    <p className="text-xl font-semibold text-gray-900">${result.totalPayment.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className={`p-4 rounded-lg ${getDebtTypeColor(result.debtType)}`}>
                                <div className="flex items-center space-x-2 mb-2">
                                    {getDebtTypeIcon(result.debtType)}
                                    <span className="font-semibold capitalize">{result.debtType} Debt</span>
                                </div>
                                <p className="text-sm">{result.recommendation}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
