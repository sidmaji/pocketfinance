// Utility functions for Pockfin

// DOM manipulation helpers
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Debounce function for performance
const debounce = (func, wait) => {
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

// Throttle function for scroll events
const throttle = (func, limit) => {
    let inThrottle
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Intersection Observer for scroll animations
const createScrollObserver = (options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    }

    const config = { ...defaultOptions, ...options }

    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up')
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
            }
        })
    }, config)
}

// Smooth scroll to element
const smoothScrollTo = (element, offset = 80) => {
    const targetPosition = element.offsetTop - offset
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
    })
}

// Add class with animation delay
const animateElement = (element, animationClass, delay = 0) => {
    setTimeout(() => {
        element.classList.add(animationClass)
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
    }, delay)
}

// Format currency
const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

// Validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Local storage helpers
const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch {
            return localStorage.getItem(key)
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            localStorage.setItem(key, value)
        }
    },

    remove: (key) => {
        localStorage.removeItem(key)
    },
}

// Export utilities for modules
window.PockfinUtils = {
    $,
    $$,
    debounce,
    throttle,
    createScrollObserver,
    smoothScrollTo,
    animateElement,
    formatCurrency,
    isValidEmail,
    generateId,
    storage,
}
