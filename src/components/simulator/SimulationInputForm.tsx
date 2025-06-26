'use client'
import Button from '@/components/ui/Button'
import { LifeEvent, SimulationInputs } from '@/lib/simulationEngine'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

interface SimulationInputFormProps {
    onSubmit: (inputs: SimulationInputs) => void
    loading?: boolean
}

export default function SimulationInputForm({ onSubmit, loading }: SimulationInputFormProps) {
    const [inputs, setInputs] = useState<SimulationInputs>({
        currentAge: 25,
        retirementAge: 65,
        currentNetWorth: 10000,
        monthlyIncome: 5000,
        monthlyExpenses: 3500,
        savingsRate: 30,
        investmentReturn: 7,
        inflationRate: 2.5,
        lifeEvents: [],
    })

    const [newEvent, setNewEvent] = useState<Partial<LifeEvent>>({
        name: '',
        age: 30,
        type: 'expense',
        amount: 0,
    })

    const addLifeEvent = () => {
        if (newEvent.name && newEvent.age && newEvent.amount) {
            const event: LifeEvent = {
                id: Date.now().toString(),
                name: newEvent.name,
                age: newEvent.age,
                type: newEvent.type as any,
                amount: newEvent.amount,
            }

            setInputs((prev) => ({
                ...prev,
                lifeEvents: [...prev.lifeEvents, event],
            }))

            setNewEvent({
                name: '',
                age: 30,
                type: 'expense',
                amount: 0,
            })
        }
    }

    const removeLifeEvent = (id: string) => {
        setInputs((prev) => ({
            ...prev,
            lifeEvents: prev.lifeEvents.filter((event) => event.id !== id),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(inputs)
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Simulation Parameters</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
                        <input
                            type="number"
                            min="18"
                            max="100"
                            value={inputs.currentAge}
                            onChange={(e) => setInputs((prev) => ({ ...prev, currentAge: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
                        <input
                            type="number"
                            min="50"
                            max="80"
                            value={inputs.retirementAge}
                            onChange={(e) => setInputs((prev) => ({ ...prev, retirementAge: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Net Worth ($)</label>
                        <input
                            type="number"
                            value={inputs.currentNetWorth}
                            onChange={(e) => setInputs((prev) => ({ ...prev, currentNetWorth: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income ($)</label>
                        <input
                            type="number"
                            value={inputs.monthlyIncome}
                            onChange={(e) => setInputs((prev) => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses ($)</label>
                        <input
                            type="number"
                            value={inputs.monthlyExpenses}
                            onChange={(e) => setInputs((prev) => ({ ...prev, monthlyExpenses: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Investment Return (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={inputs.investmentReturn}
                            onChange={(e) => setInputs((prev) => ({ ...prev, investmentReturn: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={inputs.inflationRate}
                            onChange={(e) => setInputs((prev) => ({ ...prev, inflationRate: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium mb-4">Life Events</h4>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                        <input
                            type="text"
                            placeholder="Event name"
                            value={newEvent.name}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, name: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={newEvent.age || ''}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, age: Number(e.target.value) }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <select
                            value={newEvent.type}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, type: e.target.value as any }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                            <option value="asset">Asset</option>
                            <option value="liability">Liability</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Amount ($)"
                            value={newEvent.amount || ''}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button type="button" onClick={addLifeEvent} size="sm">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {inputs.lifeEvents.map((event) => (
                            <div key={event.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <span className="font-medium">{event.name}</span>
                                <span className="text-sm text-gray-600">
                                    Age {event.age} • {event.type} • ${event.amount.toLocaleString()}
                                </span>
                                <button type="button" onClick={() => removeLifeEvent(event.id)} className="text-red-500 hover:text-red-700">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full" isLoading={loading}>
                    Run Simulation
                </Button>
            </form>
        </div>
    )
}
