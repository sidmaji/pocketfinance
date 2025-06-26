'use client'
import { Investment } from '@/lib/mockData'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface InvestmentSearchProps {
    investments: Investment[]
    onSelect: (investment: Investment) => void
}

export default function InvestmentSearch({ investments, onSelect }: InvestmentSearchProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState<string>('all')
    const [isOpen, setIsOpen] = useState(false)

    const filteredInvestments = investments.filter((investment) => {
        const matchesSearch = investment.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || investment.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = selectedType === 'all' || investment.type === selectedType
        return matchesSearch && matchesType
    })

    const handleSelect = (investment: Investment) => {
        onSelect(investment)
        setSearchTerm('')
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <div className="flex space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search investments..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setIsOpen(true)
                        }}
                        onFocus={() => setIsOpen(true)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="all">All Types</option>
                    <option value="stock">Stocks</option>
                    <option value="etf">ETFs</option>
                    <option value="crypto">Crypto</option>
                    <option value="bond">Bonds</option>
                </select>
            </div>

            {isOpen && searchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
                    {filteredInvestments.length > 0 ? (
                        filteredInvestments.map((investment) => (
                            <button key={investment.symbol} onClick={() => handleSelect(investment)} className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-900">{investment.symbol}</p>
                                        <p className="text-sm text-gray-600">{investment.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${investment.price}</p>
                                        <p className={`text-sm ${investment.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {investment.changePercent >= 0 ? '+' : ''}
                                            {investment.changePercent.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">No investments found</div>
                    )}
                </div>
            )}
        </div>
    )
}
