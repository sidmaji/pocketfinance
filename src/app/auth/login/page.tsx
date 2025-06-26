'use client'
import Button from '@/components/ui/Button'
import { auth } from '@/lib/firebase'
import { browserLocalPersistence, browserSessionPersistence, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            // Set persistence based on remember me checkbox
            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence
            await setPersistence(auth, persistence)

            await signInWithEmailAndPassword(auth, email, password)
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setError('')
        try {
            // Set persistence for Google sign-in as well
            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence
            await setPersistence(auth, persistence)

            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-green-600/20 animate-gradient-x"></div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your PocketFin account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="email"
                            required
                            placeholder="Email address"
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Password"
                            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="/auth/forgot" className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {error && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" size="lg" isLoading={loading}>
                        Sign In
                    </Button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-200" />
                    <span className="mx-4 text-gray-400 text-sm">or continue with</span>
                    <div className="flex-grow border-t border-gray-200" />
                </div>

                <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50" onClick={handleGoogleSignIn} isLoading={loading}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google
                </Button>

                <div className="mt-8 text-center">
                    <div className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/auth/register" className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
