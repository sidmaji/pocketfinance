import { LucideIcon } from 'lucide-react'

interface StatCardProps {
    title: string
    value: string
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    icon: LucideIcon
    iconColor?: string
}

export default function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'bg-purple-500' }: StatCardProps) {
    const changeColorClass = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-500',
    }[changeType]

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {change && <p className={`text-sm font-medium mt-1 ${changeColorClass}`}>{change}</p>}
                </div>
                <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    )
}
