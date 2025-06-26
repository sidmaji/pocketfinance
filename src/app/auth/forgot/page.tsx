'use client'
import Button from '@/components/ui/Button'
import { auth, sendPasswordResetEmail } from '@/lib/firebase'
import { ArrowLeft, Mail } from 'lucide-react'
import { useState } from 'react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await sendPasswordResetEmail(auth, email)
            setSuccess(true)
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold gradient-text mb-2">Reset Password</h1>
                    <p className="text-gray-600">Enter your email to receive reset instructions</p>
                </div>

                {!success ? (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="email"
                                required
                                placeholder="Email address"
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {error && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

                        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                            Send Reset Email
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">Password reset email sent! Check your inbox and follow the instructions.</div>
                        <Button variant="outline" className="w-full" onClick={() => (window.location.href = '/auth/login')}>
                            Back to Sign In
                        </Button>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <a href="/auth/login" className="text-sm text-purple-600 hover:text-purple-800 hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sign In
                    </a>
                </div>
            </div>
        </div>
    )
}
