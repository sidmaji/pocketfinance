export interface SimulationInputs {
    currentAge: number
    retirementAge: number
    currentNetWorth: number
    monthlyIncome: number
    monthlyExpenses: number
    savingsRate: number
    investmentReturn: number
    inflationRate: number
    lifeEvents: LifeEvent[]
}

export interface LifeEvent {
    id: string
    name: string
    age: number
    type: 'expense' | 'income' | 'asset' | 'liability'
    amount: number
    recurring?: boolean
    duration?: number
}

export interface SimulationResult {
    year: number
    age: number
    netWorth: number
    income: number
    expenses: number
    savings: number
    cumulativeSavings: number
    events: string[]
}

export class FinancialSimulator {
    static runSimulation(inputs: SimulationInputs): SimulationResult[] {
        const results: SimulationResult[] = []
        const yearsToSimulate = inputs.retirementAge - inputs.currentAge + 10

        let currentNetWorth = inputs.currentNetWorth
        let annualIncome = inputs.monthlyIncome * 12
        let annualExpenses = inputs.monthlyExpenses * 12
        let cumulativeSavings = 0

        for (let year = 0; year <= yearsToSimulate; year++) {
            const currentAge = inputs.currentAge + year
            const eventsThisYear: string[] = []

            // Apply life events
            const yearEvents = inputs.lifeEvents.filter((event) => event.age === currentAge)
            yearEvents.forEach((event) => {
                eventsThisYear.push(event.name)
                switch (event.type) {
                    case 'expense':
                        annualExpenses += event.amount
                        break
                    case 'income':
                        annualIncome += event.amount
                        break
                    case 'asset':
                        currentNetWorth += event.amount
                        break
                    case 'liability':
                        currentNetWorth -= event.amount
                        break
                }
            })

            // Apply inflation
            if (year > 0) {
                annualIncome *= 1 + inputs.inflationRate / 100
                annualExpenses *= 1 + inputs.inflationRate / 100
            }

            // Calculate savings
            const annualSavings = Math.max(0, annualIncome - annualExpenses)
            cumulativeSavings += annualSavings

            // Apply investment returns
            const investmentGrowth = currentNetWorth * (inputs.investmentReturn / 100)
            currentNetWorth += annualSavings + investmentGrowth

            results.push({
                year,
                age: currentAge,
                netWorth: Math.round(currentNetWorth),
                income: Math.round(annualIncome),
                expenses: Math.round(annualExpenses),
                savings: Math.round(annualSavings),
                cumulativeSavings: Math.round(cumulativeSavings),
                events: eventsThisYear,
            })
        }

        return results
    }

    static calculateRetirementReadiness(
        results: SimulationResult[],
        retirementAge: number
    ): {
        isReady: boolean
        netWorthAtRetirement: number
        recommendedAmount: number
    } {
        const retirementResult = results.find((r) => r.age === retirementAge)
        const recommendedAmount = retirementResult ? retirementResult.expenses * 25 : 0

        return {
            isReady: retirementResult ? retirementResult.netWorth >= recommendedAmount : false,
            netWorthAtRetirement: retirementResult?.netWorth || 0,
            recommendedAmount,
        }
    }
}
