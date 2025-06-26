'use client'
import Button from '@/components/ui/Button'
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react'
import { useState } from 'react'

interface RiskProfile {
    score: number
    profile: 'conservative' | 'moderate' | 'aggressive'
    allocation: {
        stocks: number
        bonds: number
        cash: number
    }
}

export default function RiskAssessment() {
    const [answers, setAnswers] = useState<number[]>(new Array(8).fill(0))
    const [result, setResult] = useState<RiskProfile | null>(null)

    const questions = [
        {
            question: 'What is your age?',
            options: ['Under 30 (5)', '30-45 (4)', '45-60 (3)', 'Over 60 (2)'],
            scores: [5, 4, 3, 2],
        },
        {
            question: 'What is your investment time horizon?',
            options: ['More than 20 years (5)', '10-20 years (4)', '5-10 years (3)', 'Less than 5 years (2)'],
            scores: [5, 4, 3, 2],
        },
        {
            question: 'How would you react to a 20% portfolio loss?',
            options: ['Buy more investments (5)', 'Hold steady (4)', 'Sell some investments (3)', 'Sell everything (1)'],
            scores: [5, 4, 3, 1],
        },
        {
            question: 'What is your primary investment goal?',
            options: ['Long-term growth (5)', 'Growth with income (4)', 'Income with some growth (3)', 'Capital preservation (2)'],
            scores: [5, 4, 3, 2],
        },
        {
            question: 'How stable is your income?',
            options: ['Very stable (4)', 'Mostly stable (3)', 'Somewhat unstable (2)', 'Very unstable (1)'],
            scores: [4, 3, 2, 1],
        },
        {
            question: 'Do you have an emergency fund?',
            options: ['6+ months expenses (4)', '3-6 months expenses (3)', '1-3 months expenses (2)', 'No emergency fund (1)'],
            scores: [4, 3, 2, 1],
        },
        {
            question: 'How much investment experience do you have?',
            options: ['Very experienced (4)', 'Some experience (3)', 'Little experience (2)', 'No experience (1)'],
            scores: [4, 3, 2, 1],
        },
        {
            question: 'What percentage of income can you invest?',
            options: ['More than 20% (4)', '15-20% (3)', '10-15% (2)', 'Less than 10% (1)'],
            scores: [4, 3, 2, 1],
        },
    ]

    const calculateRiskProfile = () => {
        const totalScore = answers.reduce((sum, answer) => sum + answer, 0)
        const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.scores), 0)
        const normalizedScore = (totalScore / maxScore) * 100

        let profile: 'conservative' | 'moderate' | 'aggressive'
        let allocation: { stocks: number; bonds: number; cash: number }

        if (normalizedScore >= 70) {
            profile = 'aggressive'
            allocation = { stocks: 80, bonds: 15, cash: 5 }
        } else if (normalizedScore >= 50) {
            profile = 'moderate'
            allocation = { stocks: 60, bonds: 30, cash: 10 }
        } else {
            profile = 'conservative'
            allocation = { stocks: 30, bonds: 50, cash: 20 }
        }

        setResult({
            score: normalizedScore,
            profile,
            allocation,
        })
    }

    const getProfileColor = (profile: string) => {
        switch (profile) {
            case 'conservative':
                return 'text-blue-600 bg-blue-100'
            case 'moderate':
                return 'text-yellow-600 bg-yellow-100'
            case 'aggressive':
                return 'text-red-600 bg-red-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const getProfileIcon = (profile: string) => {
        switch (profile) {
            case 'conservative':
                return <Shield className="h-6 w-6" />
            case 'moderate':
                return <TrendingUp className="h-6 w-6" />
            case 'aggressive':
                return <AlertTriangle className="h-6 w-6" />
            default:
                return <Shield className="h-6 w-6" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Risk Assessment</h2>

                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="space-y-3">
                            <h3 className="font-medium text-gray-900">
                                {index + 1}. {question.question}
                            </h3>
                            <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                    <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={question.scores[optionIndex]}
                                            onChange={(e) => {
                                                const newAnswers = [...answers]
                                                newAnswers[index] = Number(e.target.value)
                                                setAnswers(newAnswers)
                                            }}
                                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Button onClick={calculateRiskProfile} className="w-full" disabled={answers.some((answer) => answer === 0)}>
                        Calculate Risk Profile
                    </Button>
                </div>
            </div>

            {result && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Your Risk Profile</h3>

                    <div className={`p-4 rounded-lg mb-6 ${getProfileColor(result.profile)}`}>
                        <div className="flex items-center space-x-3">
                            {getProfileIcon(result.profile)}
                            <div>
                                <h4 className="font-semibold text-lg capitalize">{result.profile} Investor</h4>
                                <p className="text-sm">Risk Score: {result.score.toFixed(0)}/100</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3">Recommended Allocation</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Stocks</span>
                                    <span className="font-semibold">{result.allocation.stocks}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${result.allocation.stocks}%` }}></div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Bonds</span>
                                    <span className="font-semibold">{result.allocation.bonds}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${result.allocation.bonds}%` }}></div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Cash</span>
                                    <span className="font-semibold">{result.allocation.cash}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${result.allocation.cash}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Investment Strategy</h4>
                            <div className="text-sm text-gray-700 space-y-2">
                                {result.profile === 'conservative' && (
                                    <>
                                        <p>• Focus on capital preservation</p>
                                        <p>• Prefer stable, dividend-paying investments</p>
                                        <p>• Lower volatility tolerance</p>
                                        <p>• Consider bond funds and blue-chip stocks</p>
                                    </>
                                )}
                                {result.profile === 'moderate' && (
                                    <>
                                        <p>• Balance growth and stability</p>
                                        <p>• Diversified portfolio approach</p>
                                        <p>• Moderate risk tolerance</p>
                                        <p>• Mix of growth and value investments</p>
                                    </>
                                )}
                                {result.profile === 'aggressive' && (
                                    <>
                                        <p>• Focus on long-term growth</p>
                                        <p>• Higher risk tolerance</p>
                                        <p>• Growth stocks and emerging markets</p>
                                        <p>• Can handle market volatility</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
