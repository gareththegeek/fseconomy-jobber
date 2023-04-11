import { Aircraft } from './aircraft'
import { JobGroup } from './groupJobs'

export interface PricedJob extends JobGroup {
    aircraft: Aircraft
    value: number
    hours: number
    rental: number
}

const FIXED_TIME_COST = 0.25

export const priceJobs = (lookup: Record<string, number>, aircraft: Aircraft, groups: JobGroup[]): PricedJob[] => {
    const result: PricedJob[] = []
    groups.forEach(group => {
        const duration = (group.distance / aircraft.speed) + FIXED_TIME_COST
        const cost = lookup[group.from]
        const priced = { ...group, aircraft, value: 0, hours: duration, rental: cost * duration }
        priced.jobs.sort((a, b) => b.Amount - a.Amount)

        let load = 0
        let i = 0
        while (i < priced.jobs.length && load < aircraft.capacity) {
            const job = priced.jobs[i++]
            if (job.Amount <= aircraft.capacity - load) {
                const isVip = job.Type === 'VIP'
                if (isVip && priced.assignments > 0) {
                    continue
                }
                load += job.Amount
                priced.assignments += 1
                priced.value += job.Pay
                if (isVip) {
                    break
                }
            }
        }
        if (priced.assignments > 5) {
            priced.value = priced.value * (1.0 - 0.01 * priced.assignments)
        }
        priced.value -= priced.rental
        result.push(priced)
    })
    return result.filter(a => a.value > 0)
}
