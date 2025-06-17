// Simple vanilla JS router for Pockfin
class PockfinRouter {
    constructor() {
        this.routes = {}
        this.currentRoute = null
        this.homeContent = null
        this.init()
    }

    init() {
        // Store the original home content
        this.homeContent = document.querySelector('#app').parentElement.innerHTML

        // Handle popstate for browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname)
        })

        // Handle route links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]') || e.target.closest('[data-route]')) {
                e.preventDefault()
                const link = e.target.matches('[data-route]') ? e.target : e.target.closest('[data-route]')
                const path = link.getAttribute('href')
                this.navigateTo(path)
            }
        })

        // Handle initial route
        this.handleRoute(window.location.pathname)
    }

    addRoute(path, handler) {
        this.routes[path] = handler
    }

    navigateTo(path) {
        // Update URL without page reload
        window.history.pushState({}, '', path)
        this.handleRoute(path)
    }

    handleRoute(path) {
        const appContainer = document.getElementById('app')
        if (!appContainer) return

        // Clear existing content
        appContainer.innerHTML = ''

        // Handle different routes
        switch (path) {
            case '/':
                this.renderHomePage()
                break
            case '/login':
                this.renderLoginPage()
                break
            case '/signup':
                this.renderSignupPage()
                break
            case '/dashboard':
                this.renderDashboardPage()
                break
            default:
                this.renderHomePage()
        }

        // Update page title
        this.updateTitle(path)

        // Update navbar active states
        this.updateNavbar(path)
    }

    renderHomePage() {
        // Show all the existing content by making it visible
        const body = document.body
        const existingSections = body.querySelectorAll('section, footer')
        existingSections.forEach((section) => (section.style.display = 'block'))

        // Clear app container since content is in body
        document.getElementById('app').innerHTML = ''

        // Re-initialize home page functionality
        if (window.pockfinApp) {
            window.pockfinApp.setupScrollObserver()
            window.pockfinApp.setupPricingToggle()
            window.pockfinApp.setupFAQAccordion()
            window.pockfinApp.startAnimations()
        }
    }

    renderLoginPage() {
        // Hide existing sections
        this.hideExistingSections()

        // Render login page
        document.getElementById('app').innerHTML = `
            <div class="flex min-h-screen pt-20">
                <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-slate-900">Welcome back</h2>
                            <p class="mt-2 text-sm text-slate-600">Sign in to your Pockfin account</p>
                        </div>

                        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
                            <!-- Google Sign In -->
                            <button id="google-signin" class="w-full flex justify-center items-center px-4 py-3 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>

                            <div class="mt-6">
                                <div class="relative">
                                    <div class="absolute inset-0 flex items-center">
                                        <div class="w-full border-t border-slate-300"></div>
                                    </div>
                                    <div class="relative flex justify-center text-sm">
                                        <span class="px-2 bg-white text-slate-500">Or continue with email</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Email Sign In Form -->
                            <form id="signin-form" class="mt-6 space-y-6">
                                <div>
                                    <label for="email" class="block text-sm font-medium text-slate-700">Email address</label>
                                    <input id="email" name="email" type="email" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Enter your email" />
                                </div>

                                <div>
                                    <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
                                    <input id="password" name="password" type="password" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Enter your password" />
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                                        <label for="remember-me" class="ml-2 block text-sm text-slate-700">Remember me</label>
                                    </div>
                                    <a href="#" id="forgot-password" class="text-sm text-primary hover:text-primary-dark">Forgot password?</a>
                                </div>

                                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
                                    Sign in
                                </button>
                            </form>

                            <div class="mt-6 text-center">
                                <p class="text-sm text-slate-600">
                                    Don't have an account?
                                    <a href="#" onclick="window.router.navigateTo('/signup')" class="font-medium text-primary hover:text-primary-dark">Start free trial</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        // Initialize auth for login page
        this.initializeAuth()
    }

    renderSignupPage() {
        // Hide existing sections
        this.hideExistingSections()

        // Render signup page
        document.getElementById('app').innerHTML = `
            <div class="flex min-h-screen pt-20">
                <!-- Left Side - Sign Up Form -->
                <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-slate-900">Create your account</h2>
                            <p class="mt-2 text-sm text-slate-600">Start your 14-day free trial today</p>
                        </div>

                        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
                            <!-- Google Sign Up -->
                            <button id="google-signup" class="w-full flex justify-center items-center px-4 py-3 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
                                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>

                            <div class="mt-6">
                                <div class="relative">
                                    <div class="absolute inset-0 flex items-center">
                                        <div class="w-full border-t border-slate-300"></div>
                                    </div>
                                    <div class="relative flex justify-center text-sm">
                                        <span class="px-2 bg-white text-slate-500">Or continue with email</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Email Sign Up Form -->
                            <form id="signup-form" class="mt-6 space-y-6">
                                <div>
                                    <label for="email" class="block text-sm font-medium text-slate-700">Email address</label>
                                    <input id="email" name="email" type="email" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Enter your email" />
                                </div>

                                <div>
                                    <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
                                    <input id="password" name="password" type="password" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Create a password" />
                                    <p class="mt-1 text-xs text-slate-500">Must be at least 6 characters</p>
                                </div>

                                <div>
                                    <label for="confirm-password" class="block text-sm font-medium text-slate-700">Confirm Password</label>
                                    <input id="confirm-password" name="confirm-password" type="password" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary" placeholder="Confirm your password" />
                                </div>

                                <div class="flex items-center">
                                    <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                                    <label for="terms" class="ml-2 block text-sm text-slate-700">
                                        I agree to the <a href="#" class="text-primary hover:text-primary-dark">Terms of Service</a> and <a href="#" class="text-primary hover:text-primary-dark">Privacy Policy</a>
                                    </label>
                                </div>

                                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
                                    Start Free Trial
                                </button>
                            </form>

                            <div class="mt-6 text-center">
                                <p class="text-sm text-slate-600">
                                    Already have an account?
                                    <a href="#" onclick="window.router.navigateTo('/login')" class="font-medium text-primary hover:text-primary-dark">Sign in</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Benefits -->
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-emerald-600 to-blue-600 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/10"></div>
                    <div class="relative z-10 max-w-md text-white p-8">
                        <h3 class="text-2xl font-bold mb-6">Why choose Pockfin?</h3>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-medium">14-day free trial</h4>
                                    <p class="text-white/80 text-sm">No credit card required</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-medium">AI-powered insights</h4>
                                    <p class="text-white/80 text-sm">Smart financial recommendations</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-medium">Bank-level security</h4>
                                    <p class="text-white/80 text-sm">256-bit encryption</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        // Initialize auth for signup page
        this.initializeAuth()
    }

    renderDashboardPage() {
        // Hide existing sections
        this.hideExistingSections()

        // Render simple dashboard placeholder
        document.getElementById('app').innerHTML = `
            <div class="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
                <div class="container mx-auto px-4 py-8">
                    <div class="max-w-4xl mx-auto">
                        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center">
                            <h1 class="text-3xl font-bold text-slate-900 mb-4">Welcome to Pockfin Dashboard!</h1>
                            <p class="text-slate-600 mb-6">You've successfully signed up. Dashboard features coming soon!</p>
                            <button onclick="window.router.navigateTo('/')" class="btn btn-primary">
                                Back to Home
                            </button>
                            <button onclick="window.authManager.signOut()" class="btn btn-ghost ml-4">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    hideExistingSections() {
        const existingSections = document.body.querySelectorAll('section, footer')
        existingSections.forEach((section) => (section.style.display = 'none'))
    }

    updateTitle(path) {
        const titles = {
            '/': 'Pockfin - Smart Financial Management',
            '/login': 'Login - Pockfin',
            '/signup': 'Sign Up - Pockfin',
            '/dashboard': 'Dashboard - Pockfin',
        }
        document.title = titles[path] || 'Pockfin'
    }

    updateNavbar(path) {
        // Update active states in navbar based on current path
        const loginBtn = document.querySelector('a[href="/login"]')
        const signupBtn = document.querySelector('a[href="/signup"]')

        if (loginBtn && signupBtn) {
            // Reset states
            loginBtn.classList.remove('bg-slate-100')
            signupBtn.classList.remove('bg-slate-100')

            // Set active state
            if (path === '/login') {
                loginBtn.classList.add('bg-slate-100')
            } else if (path === '/signup') {
                signupBtn.classList.add('bg-slate-100')
            }
        }
    }

    initializeAuth() {
        // Initialize Firebase auth if not already done
        if (!window.authManager) {
            // Load Firebase and auth scripts dynamically
            this.loadFirebaseScripts()
        } else {
            window.authManager.setupEventListeners()
        }
    }

    loadFirebaseScripts() {
        // Load Firebase scripts
        const firebaseApp = document.createElement('script')
        firebaseApp.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'

        const firebaseAuth = document.createElement('script')
        firebaseAuth.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js'

        firebaseApp.onload = () => {
            firebaseAuth.onload = () => {
                // Load our Firebase config and auth scripts
                this.loadScript('./js/firebase-config.js', () => {
                    this.loadScript('./js/auth.js')
                })
            }
            document.head.appendChild(firebaseAuth)
        }

        document.head.appendChild(firebaseApp)
    }

    loadScript(src, callback) {
        const script = document.createElement('script')
        script.src = src
        if (callback) script.onload = callback
        document.head.appendChild(script)
    }
}

// Initialize router
window.router = new PockfinRouter()
