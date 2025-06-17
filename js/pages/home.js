class HomePage {
    render(container) {
        container.innerHTML = `
            <section class="py-20 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 relative" id="hero">
                <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div class="hero-content text-center relative z-10 max-w-6xl mx-auto px-4">
                    <div class="max-w-4xl">
                        <div class="opacity-0 translate-y-8 transition-all duration-1000 delay-300" id="hero-content">
                            <h1 class="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                                Smart Financial
                                <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Management </span>
                                Made Simple
                            </h1>

                            <p class="text-xl lg:text-2xl text-slate-600 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                                Take control of your finances with AI-powered insights, automated tracking, and intelligent recommendations that grow with your goals.
                            </p>

                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <button class="btn btn-primary btn-lg text-white shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/50 transition-all duration-300 group" onclick="router.navigateTo('/signup')">
                                    Start Free Trial
                                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </button>
                                <button class="btn btn-ghost btn-lg text-slate-700 hover:bg-white/50 backdrop-blur-sm border border-white/30">
                                    Watch Demo
                                    <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>

                            <!-- Hero Image/Mockup Placeholder -->
                            <div class="relative mx-auto max-w-4xl">
                                <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-8 relative overflow-hidden">
                                    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50"></div>
                                    <div class="relative z-10">
                                        <div class="bg-slate-100 rounded-2xl h-64 lg:h-80 flex items-center justify-center text-slate-400">
                                            <div class="text-center">
                                                <svg class="w-16 h-16 mx-auto mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                </svg>
                                                <p class="text-lg font-medium">Dashboard Preview</p>
                                                <p class="text-sm opacity-75">Interactive financial management interface</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Include all other sections from the original index.html content here -->
        `

        // Initialize animations for this page
        this.initAnimations()
    }

    initAnimations() {
        const heroContent = document.getElementById('hero-content')
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.remove('opacity-0', 'translate-y-8')
                heroContent.classList.add('opacity-100', 'translate-y-0')
            }, 500)
        }
    }
}

window.HomePage = HomePage
