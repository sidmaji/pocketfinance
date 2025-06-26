'use client'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { sendEmailVerification } from '@/lib/firebase'
import { Mail, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [resent, setResent] = useState(false)

    useEffect(() => {
        if (user?.emailVerified) {
            router.push('/dashboard')
        }
    }, [user, router])

    const handleResendVerification = async () => {
        if (!user) return

        setLoading(true)
        try {
            await sendEmailVerification(user)
            setResent(true)
        } catch (error) {
            console.error('Error sending verification email:', error)
        }
        setLoading(false)
    }

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                <div className="mb-8">
                    <Mail className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold gradient-text mb-2">Verify Your Email</h1>
                    <p className="text-gray-600">
                        We've sent a verification link to <span className="font-semibold">{user?.email}</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg text-sm">
                        Please check your email and click the verification link to activate your account.
                    </div>

                    {resent && <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">Verification email resent successfully!</div>}

                    <div className="flex flex-col gap-3">
                        <Button onClick={handleRefresh} variant="outline" className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            I've verified my email
                        </Button>

                        <Button onClick={handleResendVerification} variant="ghost" isLoading={loading} className="text-sm">
                            Resend verification email
                        </Button>
                    </div>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                    Wrong email address?{' '}
                    <a href="/auth/register" className="text-purple-600 hover:text-purple-800 hover:underline">
                        Sign up again
                    </a>
                </div>
            </div>
        </div>
    )
}
