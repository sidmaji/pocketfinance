// Main application logic for Pockfin
class PockfinApp {
    constructor() {
        this.scrollObserver = null
        this.isLoaded = false
        this.init()
    }

    init() {
        this.setupScrollObserver()
        this.setupNavigation()
        this.setupHeroAnimations()
        this.setupMobileMenu()
        this.setupSmoothScrolling()
        this.setupPricingToggle()
        this.setupFAQAccordion()

        // Initialize animations after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startAnimations())
        } else {
            this.startAnimations()
        }
    }

    setupScrollObserver() {
        const { createScrollObserver } = window.PockfinUtils

        this.scrollObserver = createScrollObserver({
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
        })

        // Observe elements for scroll animations
        const elementsToObserve = [
            '#mission-content',
            '#mission-card-1',
            '#mission-card-2',
            '#mission-card-3',
            '#features-header',
            '#feature-1',
            '#feature-2',
            '#feature-3',
            '#feature-4',
            '#advanced-header',
            '#advanced-feature-1',
            '#advanced-feature-2',
            '#advanced-feature-3',
            '#advanced-feature-4',
            '#advanced-feature-5',
            '#advanced-feature-6',
            '#testimonials-header',
            '#testimonial-1',
            '#testimonial-2',
            '#testimonial-3',
            '#pricing-header',
            '#pricing-free',
            '#pricing-pro',
            '#pricing-enterprise',
            '#faq-header',
            '#faq-1',
            '#faq-2',
            '#faq-3',
            '#faq-4',
            '#faq-5',
            '#community-header',
            '#community-stat-1',
            '#community-stat-2',
            '#community-stat-3',
            '#community-cta',
            '#final-cta',
        ]

        elementsToObserve.forEach((selector) => {
            const element = document.querySelector(selector)
            if (element) {
                this.scrollObserver.observe(element)
            }
        })
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar')
        if (!navbar) return

        // Navbar scroll effect
        const handleScroll = window.PockfinUtils.throttle(() => {
            const scrollY = window.scrollY

            if (scrollY > 100) {
                navbar.classList.add('backdrop-blur-lg', 'bg-white/90', 'shadow-lg')
                navbar.classList.remove('bg-white/80')
            } else {
                navbar.classList.remove('backdrop-blur-lg', 'bg-white/90', 'shadow-lg')
                navbar.classList.add('bg-white/80')
            }
        }, 16)

        window.addEventListener('scroll', handleScroll)
    }

    setupHeroAnimations() {
        const heroContent = document.getElementById('hero-content')
        if (!heroContent) return

        // Trigger hero animation on load
        setTimeout(() => {
            heroContent.classList.remove('opacity-0', 'translate-y-8')
            heroContent.classList.add('opacity-100', 'translate-y-0')
        }, 500)
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn')
        const dropdown = mobileMenuBtn?.parentElement.querySelector('.dropdown-content')

        if (mobileMenuBtn && dropdown) {
            mobileMenuBtn.addEventListener('click', () => {
                dropdown.classList.toggle('opacity-0')
                dropdown.classList.toggle('scale-95')
            })

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.add('opacity-0', 'scale-95')
                }
            })
        }
    }

    setupSmoothScrolling() {
        const { smoothScrollTo } = window.PockfinUtils

        // Handle navigation link clicks for anchor links
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const targetId = link.getAttribute('href').substring(1)
                const targetElement = document.getElementById(targetId)

                if (targetElement) {
                    smoothScrollTo(targetElement)
                }
            })
        })

        // Handle SPA navigation for data-route elements
        document.querySelectorAll('[data-route]').forEach((element) => {
            element.addEventListener('click', (e) => {
                e.preventDefault()
                const route = element.getAttribute('data-route') || element.getAttribute('href')
                if (route && window.router) {
                    window.router.navigateTo(route)
                }
            })
        })

        // Handle CTA button clicks - redirect to signup
        document.querySelectorAll('button, a').forEach((element) => {
            const text = element.textContent?.toLowerCase() || ''

            if (text.includes('start free trial') || text.includes('get started free') || text.includes('start pro trial')) {
                element.addEventListener('click', (e) => {
                    e.preventDefault()
                    if (window.router) {
                        window.router.navigateTo('/signup')
                    }
                })
            }
        })
    }

    setupPricingToggle() {
        const billingToggle = document.getElementById('billing-toggle')
        if (!billingToggle) return

        billingToggle.addEventListener('change', () => {
            const monthlyPrices = document.querySelectorAll('.monthly-price')
            const annualPrices = document.querySelectorAll('.annual-price')
            const toggleDot = document.querySelector('.dot')

            if (billingToggle.checked) {
                // Show annual pricing
                monthlyPrices.forEach((price) => price.classList.add('hidden'))
                annualPrices.forEach((price) => price.classList.remove('hidden'))
                toggleDot.style.transform = 'translateX(24px)'
                toggleDot.parentElement.classList.add('bg-emerald-500')
                toggleDot.parentElement.classList.remove('bg-slate-300')
            } else {
                // Show monthly pricing
                monthlyPrices.forEach((price) => price.classList.remove('hidden'))
                annualPrices.forEach((price) => price.classList.add('hidden'))
                toggleDot.style.transform = 'translateX(0)'
                toggleDot.parentElement.classList.remove('bg-emerald-500')
                toggleDot.parentElement.classList.add('bg-slate-300')
            }
        })
    }

    setupFAQAccordion() {
        const faqButtons = document.querySelectorAll('.faq-button')

        faqButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target')
                const content = document.getElementById(targetId)
                const icon = button.querySelector('svg')

                if (!content) return

                const isOpen = !content.classList.contains('hidden')

                // Close all other FAQ items
                faqButtons.forEach((otherButton) => {
                    if (otherButton !== button) {
                        const otherTargetId = otherButton.getAttribute('data-target')
                        const otherContent = document.getElementById(otherTargetId)
                        const otherIcon = otherButton.querySelector('svg')

                        if (otherContent && !otherContent.classList.contains('hidden')) {
                            otherContent.classList.add('hidden')
                            otherIcon.style.transform = 'rotate(0deg)'
                        }
                    }
                })

                // Toggle current FAQ item
                if (isOpen) {
                    content.classList.add('hidden')
                    icon.style.transform = 'rotate(0deg)'
                } else {
                    content.classList.remove('hidden')
                    icon.style.transform = 'rotate(180deg)'
                }
            })
        })
    }

    startAnimations() {
        const { animateElement } = window.PockfinUtils

        // Animate mission cards with stagger
        const missionCards = [document.getElementById('mission-card-1'), document.getElementById('mission-card-2'), document.getElementById('mission-card-3')]

        missionCards.forEach((card, index) => {
            if (card) {
                setTimeout(() => {
                    card.style.opacity = '1'
                    card.style.transform = 'translateY(0)'
                    card.classList.add('animate-fade-in-up')
                }, 200 * index)
            }
        })

        // Animate advanced features with stagger
        const advancedFeatures = ['#advanced-feature-1', '#advanced-feature-2', '#advanced-feature-3', '#advanced-feature-4', '#advanced-feature-5', '#advanced-feature-6']

        advancedFeatures.forEach((selector, index) => {
            const element = document.querySelector(selector)
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1'
                    element.style.transform = 'translateY(0)'
                    element.classList.add('animate-fade-in-up')
                }, 100 * index)
            }
        })

        // Animate FAQ items with stagger
        const faqItems = ['#faq-1', '#faq-2', '#faq-3', '#faq-4', '#faq-5']

        faqItems.forEach((selector, index) => {
            const element = document.querySelector(selector)
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1'
                    element.style.transform = 'translateY(0)'
                    element.classList.add('animate-fade-in-up')
                }, 150 * index)
            }
        })

        // Animate community stats with stagger
        const communityStats = ['#community-stat-1', '#community-stat-2', '#community-stat-3']

        communityStats.forEach((selector, index) => {
            const element = document.querySelector(selector)
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1'
                    element.style.transform = 'translateY(0)'
                    element.classList.add('animate-fade-in-up')
                }, 200 * index)
            }
        })

        this.isLoaded = true
    }

    // Update navigation method to use router
    navigateTo(route) {
        if (window.router) {
            window.router.navigateTo(route)
        } else {
            console.log(`Navigating to: ${route}`)
        }
    }
}

// Initialize app
window.pockfinApp = new PockfinApp()
