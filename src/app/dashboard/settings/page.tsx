'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { Bell, CreditCard, Download, Shield, Trash2, User } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('profile')
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: true,
        updates: true,
    })

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'billing', name: 'Billing', icon: CreditCard },
        { id: 'data', name: 'Data & Privacy', icon: Download },
    ]

    const handleNotificationChange = (key: string, value: boolean) => {
        setNotifications((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <ProtectedRoute>
            <DashboardLayout title="Settings">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                            activeTab === tab.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Profile Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" value={user?.email || ''} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                                            <input
                                                type="text"
                                                value={user?.displayName || ''}
                                                placeholder="Enter display name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>
                                    </div>
                                    <Button>Update Profile</Button>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Notification Preferences</h3>
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium capitalize">{key} Notifications</h4>
                                                    <p className="text-sm text-gray-600">Receive {key} notifications about your account</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={value} onChange={(e) => handleNotificationChange(key, e.target.checked)} className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Security Settings</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Change Password</h4>
                                                <p className="text-sm text-gray-600">Update your account password</p>
                                            </div>
                                            <Button variant="outline">Change</Button>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Two-Factor Authentication</h4>
                                                <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                            </div>
                                            <Button variant="outline">Enable</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium">Current Plan: Free</h4>
                                                <p className="text-sm text-gray-600">You're currently on the free plan</p>
                                            </div>
                                            <Button onClick={() => (window.location.href = '/pricing')}>Upgrade</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'data' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Data & Privacy</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h4 className="font-medium">Export Data</h4>
                                                <p className="text-sm text-gray-600">Download your data in JSON format</p>
                                            </div>
                                            <Button variant="outline">
                                                <Download className="h-4 w-4 mr-2" />
                                                Export
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                                            <div>
                                                <h4 className="font-medium text-red-800">Delete Account</h4>
                                                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                                            </div>
                                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}
