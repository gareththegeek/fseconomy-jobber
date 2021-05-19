import { JobGroup } from './groupJobs'

const CAPACITY = parseInt(process.env.CAPACITY || '0')

export const priceJobs = (groups: JobGroup[]): JobGroup[] => {
    groups.forEach(group => {
        group.jobs.sort((a, b) => b.Amount - a.Amount)
        let load = 0
        let i = 0
        while (i < group.jobs.length && load < CAPACITY) {
            const job = group.jobs[i++]
            if (job.Amount <= CAPACITY - load) {
                load += job.Amount
                group.assignments += 1
                group.value += job.Pay
            }
        }
        if (group.assignments > 5) {
            group.value = group.value * (1.0 - 0.01 * group.assignments)
        }
    })
    return groups
}
