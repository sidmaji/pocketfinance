document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('investment-form')
    const resultsPanel = document.getElementById('results-panel')

    if (form) {
        form.addEventListener('submit', handleCalculation)
    }
})

function handleCalculation(e) {
    e.preventDefault()

    const initial = parseFloat(document.getElementById('initial').value) || 0
    const monthly = parseFloat(document.getElementById('monthly').value) || 0
    const years = parseFloat(document.getElementById('years').value) || 0
    const rate = parseFloat(document.getElementById('rate').value) || 0

    if (initial <= 0 || years <= 0 || rate <= 0) {
        showError('Please enter valid positive values for all fields.')
        return
    }

    const results = calculateInvestment(initial, monthly, years, rate)
    displayResults(results)
    animateResults()
}

function calculateInvestment(initial, monthly, years, annualRate) {
    const monthlyRate = annualRate / 100 / 12
    const totalMonths = years * 12

    const futureValueInitial = initial * Math.pow(1 + monthlyRate, totalMonths)

    let futureValueMonthly = 0
    if (monthly > 0) {
        futureValueMonthly = (monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / monthlyRate
    }

    const totalInvested = initial + monthly * totalMonths
    const finalValue = futureValueInitial + futureValueMonthly
    const totalGain = finalValue - totalInvested

    return {
        totalInvested,
        finalValue,
        totalGain,
    }
}

function displayResults(results) {
    document.getElementById('total-invested').textContent = formatCurrency(results.totalInvested)
    document.getElementById('final-value').textContent = formatCurrency(results.finalValue)
    document.getElementById('total-gain').textContent = formatCurrency(results.totalGain)

    const resultsPanel = document.getElementById('results-panel')
    resultsPanel.style.display = 'block'
}

function animateResults() {
    const resultItems = document.querySelectorAll('.result-item')
    resultItems.forEach((item, index) => {
        item.style.opacity = '0'
        item.style.transform = 'translateX(20px)'

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease'
            item.style.opacity = '1'
            item.style.transform = 'translateX(0)'
        }, index * 100)
    })
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

function showError(message) {
    console.error(message)
}
