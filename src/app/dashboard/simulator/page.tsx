'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import SimulationInputForm from '@/components/simulator/SimulationInputForm'
import SimulationResults from '@/components/simulator/SimulationResults'
import Button from '@/components/ui/Button'
import { FinancialSimulator, SimulationInputs, SimulationResult } from '@/lib/simulationEngine'
import { Download, Save, Share } from 'lucide-react'
import { useState } from 'react'

export default function SimulatorPage() {
    const [results, setResults] = useState<SimulationResult[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [currentInputs, setCurrentInputs] = useState<SimulationInputs | null>(null)

    const handleRunSimulation = async (inputs: SimulationInputs) => {
        setLoading(true)
        setCurrentInputs(inputs)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const simulationResults = FinancialSimulator.runSimulation(inputs)
        setResults(simulationResults)
        setLoading(false)
    }

    const handleExport = () => {
        if (!results) return

        const csv = [
            'Age,Year,Net Worth,Income,Expenses,Savings,Events',
            ...results.map((r) => `${r.age},${r.year},${r.netWorth},${r.income},${r.expenses},${r.savings},"${r.events.join(', ')}"`),
        ].join('\n')

        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'financial-simulation.csv'
        a.click()
    }

    const handleShare = async () => {
        if (!results || !currentInputs) return

        const shareData = {
            title: 'PocketFin Financial Simulation',
            text: `I just ran a financial simulation and my projected net worth at retirement is $${results.find((r) => r.age === currentInputs.retirementAge)?.netWorth.toLocaleString()}!`,
            url: window.location.href,
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.error('Error sharing:', err)
            }
        } else {
            navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
            alert('Results copied to clipboard!')
        }
    }

    return (
        <ProtectedRoute>
            <DashboardLayout title="Financial Simulator">
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Financial Life Simulator</h2>
                        <p className="text-purple-100">
                            Model your financial future with powerful projection tools. Add life events, adjust parameters, and see how your decisions impact your long-term wealth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <SimulationInputForm onSubmit={handleRunSimulation} loading={loading} />
                        </div>

                        <div className="lg:col-span-2">
                            {loading ? (
                                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                                    <h3 className="text-lg font-semibold text-gray-700">Running Simulation...</h3>
                                    <p className="text-gray-500">Calculating your financial future</p>
                                </div>
                            ) : results && currentInputs ? (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold">Simulation Results</h3>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm" onClick={handleExport}>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Export
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={handleShare}>
                                                    <Share className="h-4 w-4 mr-2" />
                                                    Share
                                                </Button>
                                                <Button size="sm">
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Save Scenario
                                                </Button>
                                            </div>
                                        </div>
                                        <SimulationResults results={results} retirementAge={currentInputs.retirementAge} />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Share className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Simulate</h3>
                                    <p className="text-gray-500">Fill out the simulation parameters and click "Run Simulation" to see your financial projection.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}
