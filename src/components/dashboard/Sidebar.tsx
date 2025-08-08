'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Calculator, GraduationCap, LayoutDashboard, LogOut, Settings, Target, TrendingUp, User, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Financial Simulator', href: '/dashboard/simulator', icon: Calculator },
    { name: 'Investment Sandbox', href: '/dashboard/investments', icon: TrendingUp },
    { name: 'Education', href: '/dashboard/education', icon: GraduationCap },
    { name: 'Goals', href: '/dashboard/goals', icon: Target },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)} />

            <div
                className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-primary p-2 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">PockFin</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 px-4 py-6">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                            isActive ? 'bg-gradient-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </a>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                                {user?.photoURL ? <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" /> : <User className="h-5 w-5 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName || user?.email}</p>
                                <p className="text-xs text-gray-500">Free Plan</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
