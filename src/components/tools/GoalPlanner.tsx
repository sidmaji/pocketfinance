'use client'
import Button from '@/components/ui/Button'
import { Calendar, Target } from 'lucide-react'
import { useState } from 'react'

interface FinancialGoal {
    id: string
    name: string
    targetAmount: number
    currentAmount: number
    targetDate: string
    monthlyContribution: number
    category: string
    priority: 'high' | 'medium' | 'low'
}

export default function GoalPlanner() {
    const [goals, setGoals] = useState<FinancialGoal[]>([
        {
            id: '1',
            name: 'Emergency Fund',
            targetAmount: 15000,
            currentAmount: 8500,
            targetDate: '2024-12-31',
            monthlyContribution: 500,
            category: 'Safety',
            priority: 'high',
        },
        {
            id: '2',
            name: 'House Down Payment',
            targetAmount: 60000,
            currentAmount: 22000,
            targetDate: '2026-06-30',
            monthlyContribution: 1200,
            category: 'Major Purchase',
            priority: 'high',
        },
    ])

    const [showForm, setShowForm] = useState(false)
    const [newGoal, setNewGoal] = useState({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        targetDate: '',
        monthlyContribution: 0,
        category: 'Personal',
        priority: 'medium' as const,
    })

    const calculateTimeToGoal = (goal: FinancialGoal) => {
        const remaining = goal.targetAmount - goal.currentAmount
        const months = Math.ceil(remaining / goal.monthlyContribution)
        return months
    }

    const calculateProgress = (goal: FinancialGoal) => {
        return (goal.currentAmount / goal.targetAmount) * 100
    }

    const addGoal = () => {
        const goal: FinancialGoal = {
            id: Date.now().toString(),
            ...newGoal,
        }
        setGoals([...goals, goal])
        setNewGoal({
            name: '',
            targetAmount: 0,
            currentAmount: 0,
            targetDate: '',
            monthlyContribution: 0,
            category: 'Personal',
            priority: 'medium',
        })
        setShowForm(false)
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-600 bg-red-100'
            case 'medium':
                return 'text-yellow-600 bg-yellow-100'
            case 'low':
                return 'text-green-600 bg-green-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
                <Button onClick={() => setShowForm(true)}>
                    <Target className="h-4 w-4 mr-2" />
                    Add Goal
                </Button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Goal name"
                            value={newGoal.name}
                            onChange={(e) => setNewGoal((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="number"
                            placeholder="Target amount"
                            value={newGoal.targetAmount || ''}
                            onChange={(e) => setNewGoal((prev) => ({ ...prev, targetAmount: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="number"
                            placeholder="Current amount"
                            value={newGoal.currentAmount || ''}
                            onChange={(e) => setNewGoal((prev) => ({ ...prev, currentAmount: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="date"
                            value={newGoal.targetDate}
                            onChange={(e) => setNewGoal((prev) => ({ ...prev, targetDate: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="number"
                            placeholder="Monthly contribution"
                            value={newGoal.monthlyContribution || ''}
                            onChange={(e) => setNewGoal((prev) => ({ ...prev, monthlyContribution: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <select
                            value={newGoal.priority}
                            onChange={(e) => setNewGoal((prev) => ({ ...prev, priority: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button variant="outline" onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                        <Button onClick={addGoal}>Add Goal</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goals.map((goal) => {
                    const progress = calculateProgress(goal)
                    const monthsToGoal = calculateTimeToGoal(goal)

                    return (
                        <div key={goal.id} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                                    <p className="text-sm text-gray-600">{goal.category}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>{goal.priority}</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Progress</span>
                                        <span className="text-sm text-gray-500">{progress.toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div className="bg-gradient-primary h-3 rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Current</p>
                                        <p className="font-semibold">${goal.currentAmount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Target</p>
                                        <p className="font-semibold">${goal.targetAmount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Monthly</p>
                                        <p className="font-semibold">${goal.monthlyContribution.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Time to Goal</p>
                                        <p className="font-semibold">{monthsToGoal} months</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
