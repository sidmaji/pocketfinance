document.addEventListener('DOMContentLoaded', function () {
    initializeScrollAnimations()
    initializeParallaxEffects()
    initializeCounterAnimations()
})

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right')

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = entry.target.dataset.delay || '0ms'
                    entry.target.classList.add('animate')
                }
            })
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    )

    animatedElements.forEach((el) => observer.observe(el))
}

function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background, .section-background')

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.5

        parallaxElements.forEach((element) => {
            element.style.transform = `translateY(${parallax}px)`
        })
    })
}

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.metric-value')

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                }
            })
        },
        { threshold: 0.5 }
    )

    counters.forEach((counter) => counterObserver.observe(counter))
}

function animateCounter(element) {
    const target = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ''))
    const increment = target / 50
    let current = 0

    const timer = setInterval(() => {
        current += increment
        if (current >= target) {
            current = target
            clearInterval(timer)
        }

        if (element.textContent.includes('$')) {
            element.textContent = '$' + Math.floor(current).toLocaleString()
        } else if (element.textContent.includes('%')) {
            element.textContent = current.toFixed(1) + '%'
        } else {
            element.textContent = Math.floor(current).toLocaleString()
        }
    }, 20)
}
