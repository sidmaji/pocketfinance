'use client'
import Button from '@/components/ui/Button'
import { Investment, PortfolioHolding, mockInvestments } from '@/lib/mockData'
import { DollarSign, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import InvestmentSearch from './InvestmentSearch'

interface PortfolioBuilderProps {
    portfolio: PortfolioHolding[]
    onUpdatePortfolio: (holdings: PortfolioHolding[]) => void
    cash: number
    onUpdateCash: (cash: number) => void
}

export default function PortfolioBuilder({ portfolio, onUpdatePortfolio, cash, onUpdateCash }: PortfolioBuilderProps) {
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
    const [shares, setShares] = useState<number>(0)

    const handleAddInvestment = () => {
        if (!selectedInvestment || shares <= 0) return

        const totalCost = selectedInvestment.price * shares
        if (totalCost > cash) {
            alert('Insufficient cash for this purchase')
            return
        }

        const existingHolding = portfolio.find((h) => h.symbol === selectedInvestment.symbol)

        if (existingHolding) {
            const newShares = existingHolding.shares + shares
            const newAverageCost = (existingHolding.averageCost * existingHolding.shares + totalCost) / newShares
            const newCurrentValue = selectedInvestment.price * newShares
            const newTotalReturn = newCurrentValue - newAverageCost * newShares
            const newTotalReturnPercent = ((newCurrentValue - newAverageCost * newShares) / (newAverageCost * newShares)) * 100

            const updatedHoldings = portfolio.map((holding) =>
                holding.symbol === selectedInvestment.symbol
                    ? {
                          ...holding,
                          shares: newShares,
                          averageCost: newAverageCost,
                          currentValue: newCurrentValue,
                          totalReturn: newTotalReturn,
                          totalReturnPercent: newTotalReturnPercent,
                      }
                    : holding
            )
            onUpdatePortfolio(updatedHoldings)
        } else {
            const newHolding: PortfolioHolding = {
                symbol: selectedInvestment.symbol,
                shares,
                averageCost: selectedInvestment.price,
                currentValue: totalCost,
                totalReturn: 0,
                totalReturnPercent: 0,
                weight: 0,
            }
            onUpdatePortfolio([...portfolio, newHolding])
        }

        onUpdateCash(cash - totalCost)
        setSelectedInvestment(null)
        setShares(0)
        setShowAddForm(false)
    }

    const handleRemoveInvestment = (symbol: string) => {
        const holding = portfolio.find((h) => h.symbol === symbol)
        if (holding) {
            onUpdateCash(cash + holding.currentValue)
            onUpdatePortfolio(portfolio.filter((h) => h.symbol !== symbol))
        }
    }

    const totalPortfolioValue = portfolio.reduce((sum, holding) => sum + holding.currentValue, 0)

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Portfolio Builder</h3>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Available Cash</p>
                        <p className="text-lg font-semibold text-green-600">${cash.toLocaleString()}</p>
                    </div>
                    <Button onClick={() => setShowAddForm(true)} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Investment
                    </Button>
                </div>
            </div>

            {showAddForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Add Investment</h4>
                    <div className="space-y-3">
                        <InvestmentSearch investments={mockInvestments} onSelect={setSelectedInvestment} />

                        {selectedInvestment && (
                            <div className="flex items-center space-x-3">
                                <div className="flex-1">
                                    <p className="font-semibold">
                                        {selectedInvestment.symbol} - ${selectedInvestment.price}
                                    </p>
                                    <p className="text-sm text-gray-600">{selectedInvestment.name}</p>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Shares"
                                    value={shares || ''}
                                    onChange={(e) => setShares(Number(e.target.value))}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Total Cost</p>
                                    <p className="font-semibold">${(selectedInvestment.price * shares).toLocaleString()}</p>
                                </div>
                                <Button onClick={handleAddInvestment} size="sm">
                                    Add
                                </Button>
                                <Button variant="outline" onClick={() => setShowAddForm(false)} size="sm">
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {portfolio.length > 0 ? (
                    portfolio.map((holding) => {
                        const weight = totalPortfolioValue > 0 ? (holding.currentValue / totalPortfolioValue) * 100 : 0
                        const investment = mockInvestments.find((inv) => inv.symbol === holding.symbol)

                        return (
                            <div key={holding.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <p className="font-semibold">{holding.symbol}</p>
                                            <p className="text-sm text-gray-600">{investment?.name}</p>
                                        </div>
                                        <div className="text-sm">
                                            <p>
                                                {holding.shares} shares @ ${holding.averageCost.toFixed(2)}
                                            </p>
                                            <p className="text-gray-600">{weight.toFixed(1)}% of portfolio</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right mr-4">
                                    <p className="font-semibold">${holding.currentValue.toLocaleString()}</p>
                                    <p className={`text-sm ${holding.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {holding.totalReturnPercent >= 0 ? '+' : ''}${holding.totalReturn.toFixed(0)}({holding.totalReturnPercent.toFixed(1)}%)
                                    </p>
                                </div>

                                <button onClick={() => handleRemoveInvestment(holding.symbol)} className="text-red-500 hover:text-red-700 p-1">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium mb-1">No investments yet</p>
                        <p className="text-sm">Add your first investment to get started</p>
                    </div>
                )}
            </div>
        </div>
    )
}
