document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation()
    initializeScrollEffects()
    initializeSmoothScrolling()
    initializeIntersectionObserver()
    initializeTiltCard()
})

function initializeTiltCard() {
    const tiltCard = document.getElementById('tilt-card')
    if (!tiltCard) return

    let isHovering = false
    let animationFrame = null

    tiltCard.addEventListener('mouseenter', () => {
        isHovering = true
        tiltCard.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

        // Gradually scale up on enter
        tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.02, 1.02, 1.02)'
    })

    tiltCard.addEventListener('mousemove', (e) => {
        if (!isHovering) return

        if (animationFrame) {
            cancelAnimationFrame(animationFrame)
        }

        animationFrame = requestAnimationFrame(() => {
            const rect = tiltCard.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2

            // Reduced tilt intensity for smoother effect
            const rotateX = ((y - centerY) / centerY) * -6
            const rotateY = ((x - centerX) / centerX) * 6

            tiltCard.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        })
    })

    tiltCard.addEventListener('mouseleave', () => {
        isHovering = false
        if (animationFrame) {
            cancelAnimationFrame(animationFrame)
        }

        tiltCard.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    })
}

function initializeNavigation() {
    const navbar = document.getElementById('navbar')
    const hamburger = document.getElementById('hamburger')
    const navMenu = document.getElementById('nav-menu')

    // Set initial navbar state based on scroll position
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled')
        } else {
            navbar.classList.remove('scrolled')
        }
    })

    hamburger?.addEventListener('click', () => {
        navMenu?.classList.toggle('active')
        hamburger.classList.toggle('active')
    })
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            } else {
                entry.target.classList.remove('visible')
            }
        })
    }, observerOptions)

    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scroll-triggered').forEach((el) => {
        observer.observe(el)
    })
}

function initializeScrollEffects() {
    let ticking = false

    function updateParallax() {
        const scrolled = window.pageYOffset
        const heroBackground = document.querySelector('.hero-background')
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
        }
        ticking = false
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax)
            ticking = true
        }
    })
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                const offsetTop = target.offsetTop - 80
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                })
            }
        })
    })
}

window.scrollToSection = function (sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
        })
    }
}
