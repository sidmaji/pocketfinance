class AuthManager {
    constructor() {
        this.init()
    }

    init() {
        // Setup event listeners when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners())
        } else {
            this.setupEventListeners()
        }

        this.checkAuthState()
    }

    setupEventListeners() {
        // Sign up form
        const signupForm = document.getElementById('signup-form')
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e))
        }

        // Sign in form
        const signinForm = document.getElementById('signin-form')
        if (signinForm) {
            signinForm.addEventListener('submit', (e) => this.handleSignin(e))
        }

        // Google sign up
        const googleSignup = document.getElementById('google-signup')
        if (googleSignup) {
            googleSignup.addEventListener('click', () => this.handleGoogleAuth())
        }

        // Google sign in
        const googleSignin = document.getElementById('google-signin')
        if (googleSignin) {
            googleSignin.addEventListener('click', () => this.handleGoogleAuth())
        }

        // Forgot password
        const forgotPassword = document.getElementById('forgot-password')
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e))
        }
    }

    async handleSignup(e) {
        e.preventDefault()

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirm-password').value
        const terms = document.getElementById('terms').checked

        // Validation
        if (password !== confirmPassword) {
            this.showError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters')
            return
        }

        if (!terms) {
            this.showError('Please accept the terms and conditions')
            return
        }

        try {
            this.showLoading('Creating your account...')

            const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password)

            // Send email verification
            await userCredential.user.sendEmailVerification()

            this.showSuccess('Account created! Please check your email to verify your account.')

            // Redirect to dashboard
            setTimeout(() => {
                window.router.navigateTo('/dashboard')
            }, 2000)
        } catch (error) {
            this.showError(this.getErrorMessage(error.code))
        } finally {
            this.hideLoading()
        }
    }

    async handleSignin(e) {
        e.preventDefault()

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            this.showLoading('Signing you in...')

            await window.firebaseAuth.signInWithEmailAndPassword(email, password)

            this.showSuccess('Welcome back!')

            // Redirect to dashboard
            setTimeout(() => {
                window.router.navigateTo('/dashboard')
            }, 1000)
        } catch (error) {
            this.showError(this.getErrorMessage(error.code))
        } finally {
            this.hideLoading()
        }
    }

    async handleGoogleAuth() {
        try {
            this.showLoading('Connecting with Google...')

            const result = await window.firebaseAuth.signInWithPopup(window.firebaseAuth.googleProvider)

            this.showSuccess('Successfully signed in with Google!')

            // Redirect to dashboard
            setTimeout(() => {
                window.router.navigateTo('/dashboard')
            }, 1000)
        } catch (error) {
            if (error.code !== 'auth/popup-closed-by-user') {
                this.showError(this.getErrorMessage(error.code))
            }
        } finally {
            this.hideLoading()
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault()

        const email = document.getElementById('email').value

        if (!email) {
            this.showError('Please enter your email address first')
            return
        }

        try {
            await window.firebaseAuth.sendPasswordResetEmail(email)
            this.showSuccess('Password reset email sent! Check your inbox.')
        } catch (error) {
            this.showError(this.getErrorMessage(error.code))
        }
    }

    checkAuthState() {
        window.firebaseAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, redirect to dashboard if on auth pages
                const currentPath = window.location.pathname
                if (currentPath === '/login' || currentPath === '/signup') {
                    window.router.navigateTo('/dashboard')
                }
            }
        })
    }

    getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
            'auth/weak-password': 'Password should be at least 6 characters.',
            'auth/user-disabled': 'This account has been disabled.',
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password.',
            'auth/invalid-credential': 'Invalid email or password.',
            'auth/popup-blocked': 'Popup blocked. Please allow popups for this site.',
            'auth/popup-closed-by-user': 'Sign-in cancelled.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
        }

        return errorMessages[errorCode] || 'An error occurred. Please try again.'
    }

    showError(message) {
        this.showMessage(message, 'error')
    }

    showSuccess(message) {
        this.showMessage(message, 'success')
    }

    showMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.auth-message')
        if (existingMessage) {
            existingMessage.remove()
        }

        const messageDiv = document.createElement('div')
        messageDiv.className = `auth-message fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`
        messageDiv.textContent = message

        document.body.appendChild(messageDiv)

        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove()
        }, 5000)
    }

    showLoading(message) {
        const loadingDiv = document.createElement('div')
        loadingDiv.id = 'loading-overlay'
        loadingDiv.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50'
        loadingDiv.innerHTML = `
            <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span class="text-slate-700">${message}</span>
            </div>
        `

        document.body.appendChild(loadingDiv)
    }

    hideLoading() {
        const loadingDiv = document.getElementById('loading-overlay')
        if (loadingDiv) {
            loadingDiv.remove()
        }
    }

    // Add sign out method
    async signOut() {
        try {
            await window.firebaseAuth.signOut()
            this.showSuccess('Successfully signed out')
            window.router.navigateTo('/')
        } catch (error) {
            this.showError('Error signing out')
        }
    }
}

// Initialize Auth Manager
window.authManager = new AuthManager()
