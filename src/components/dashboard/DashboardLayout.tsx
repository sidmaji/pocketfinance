'use client'
import { ReactNode, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface DashboardLayoutProps {
    children: ReactNode
    title: string
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={title} onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    )
}
