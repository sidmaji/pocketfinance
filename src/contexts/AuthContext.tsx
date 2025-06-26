'use client'
import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    user: User | null
    loading: boolean
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const value = {
        user,
        loading,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
