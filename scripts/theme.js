document.addEventListener('DOMContentLoaded', function () {
    initializeTheme()
})

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle')
    const savedTheme = localStorage.getItem('theme') || 'light'

    document.documentElement.setAttribute('data-theme', savedTheme)

    themeToggle?.addEventListener('click', toggleTheme)
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)

    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease'

    setTimeout(() => {
        document.body.style.transition = ''
    }, 300)
}
