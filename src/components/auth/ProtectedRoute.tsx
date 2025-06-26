'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
    requireVerification?: boolean
}

export default function ProtectedRoute({ children, requireVerification = false }: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login')
                return
            }

            if (requireVerification && !user.emailVerified) {
                router.push('/auth/verify-email')
                return
            }
        }
    }, [user, loading, router, requireVerification])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    if (requireVerification && !user.emailVerified) {
        return null
    }

    return <>{children}</>
}
