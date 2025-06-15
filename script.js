// Navigation and Mobile Menu
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger')
    const navMenu = document.getElementById('nav-menu')
    const navLinks = document.querySelectorAll('.nav-link')

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active')

        // Animate hamburger
        hamburger.classList.toggle('active')
    })

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active')
            hamburger.classList.remove('active')
        })
    })

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink)

    // Initialize budget calculator
    initBudgetCalculator()

    // Add smooth scrolling and animations
    initAnimations()
})

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'features', 'demo', 'about', 'contact']
    const scrollPosition = window.scrollY + 100

    sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        const navLink = document.querySelector(`a[href="#${sectionId}"]`)

        if (section && navLink) {
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach((link) => {
                    link.classList.remove('active')
                })
                // Add active class to current link
                navLink.classList.add('active')
            }
        }
    })
}

// Hero card 3D tilt effect
;(function () {
    const card = document.getElementById('hero-card')
    if (!card) return
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * 10 // max 10deg
        const rotateY = ((x - centerX) / centerX) * -10
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })
    card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    })
    card.addEventListener('mouseenter', function () {
        card.style.transition = 'transform 0.2s cubic-bezier(.25,.8,.25,1)'
    })
})()

// Replace budget calculator with investment calculator
function initBudgetCalculator() {
    const budgetForm = document.getElementById('budget-form')
    const resultsCard = document.getElementById('results-card')

    budgetForm.addEventListener('submit', function (e) {
        e.preventDefault()
        calculateInvestment()
    })

    // Real-time calculation on input change
    const inputs = budgetForm.querySelectorAll('input[type="number"]')
    inputs.forEach((input) => {
        input.addEventListener('input', debounce(calculateInvestment, 500))
    })
}

function calculateInvestment() {
    // Get values
    const initial = parseFloat(document.getElementById('initial').value) || 0
    const monthly = parseFloat(document.getElementById('monthly').value) || 0
    const years = parseFloat(document.getElementById('years').value) || 0
    const rate = parseFloat(document.getElementById('rate').value) || 0

    // Compound interest formula with monthly contributions
    const n = 12
    const t = years
    const r = rate / 100
    let futureValue = 0
    if (r > 0 && t > 0) {
        futureValue = initial * Math.pow(1 + r / n, n * t) + monthly * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
    } else {
        // No interest or no years
        futureValue = initial + monthly * n * t
    }

    // Display results
    displayInvestmentResults(initial, monthly, years, rate, futureValue)

    // Generate suggestions
    generateInvestmentSuggestions(initial, monthly, years, rate, futureValue)
}

function displayInvestmentResults(initial, monthly, years, rate, futureValue) {
    const resultsCard = document.getElementById('results-card')
    document.getElementById('total-income').textContent = formatCurrency(initial)
    document.getElementById('total-expenses').textContent = formatCurrency(monthly * years * 12)
    const balanceEl = document.getElementById('balance')
    balanceEl.textContent = formatCurrency(futureValue)
    balanceEl.className = 'positive'

    resultsCard.style.display = 'block'
    resultsCard.classList.add('fade-in-up')
}

function generateInvestmentSuggestions(initial, monthly, years, rate, futureValue) {
    const suggestionsEl = document.getElementById('suggestions')
    const suggestions = []
    if (initial === 0 && monthly === 0) {
        suggestions.push('<span class="icon icon-budget"></span> Enter an initial investment or monthly contribution to see your projected growth.')
        suggestionsEl.innerHTML = suggestions.map((s) => `<div class="suggestion-item">${s}</div>`).join('')
        return
    }
    if (years < 1) {
        suggestions.push('<span class="icon icon-progress"></span> Try increasing the number of years to see the power of compounding.')
    }
    if (rate < 1) {
        suggestions.push('<span class="icon icon-progress"></span> Enter a realistic annual return rate (e.g., 5-8% for stocks).')
    }
    if (futureValue > initial + monthly * years * 12) {
        suggestions.push('<span class="icon icon-progress"></span> Compounding is working for you! Stay invested for long-term growth.')
    }
    if (monthly > 0 && years > 0) {
        suggestions.push('<span class="icon icon-progress"></span> Regular contributions make a huge difference over time.')
    }
    suggestionsEl.innerHTML = suggestions.map((s) => `<div class="suggestion-item">${s}</div>`).join('')
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up')
            }
        })
    }, observerOptions)

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .team-member, .calculator-card')
    elementsToAnimate.forEach((el) => observer.observe(el))
}

// Add navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar')
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)'
        navbar.style.backdropFilter = 'blur(20px)'
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)'
        navbar.style.backdropFilter = 'blur(10px)'
    }
})

// Add click handlers for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    })
})

// Form validation and user feedback
function validateBudgetForm() {
    const initial = parseFloat(document.getElementById('initial').value) || 0
    const monthly = parseFloat(document.getElementById('monthly').value) || 0
    const years = parseFloat(document.getElementById('years').value) || 0
    const rate = parseFloat(document.getElementById('rate').value) || 0
    const submitBtn = document.querySelector('.calculate-btn')

    if ((initial <= 0 && monthly <= 0) || years <= 0 || rate < 0) {
        submitBtn.textContent = 'Enter valid values'
        submitBtn.style.background = '#9ca3af'
        submitBtn.disabled = true
    } else {
        submitBtn.textContent = 'Calculate Investment'
        submitBtn.style.background = 'var(--primary-color)'
        submitBtn.disabled = false
    }
}

// Add input validation
;['initial', 'monthly', 'years', 'rate'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) {
        el.addEventListener('input', validateBudgetForm)
    }
})

// Initialize validation on page load
window.addEventListener('load', validateBudgetForm)
document.getElementById('income').addEventListener('input', validateBudgetForm)

// Initialize validation on page load
window.addEventListener('load', validateBudgetForm)
