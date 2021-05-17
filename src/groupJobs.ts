import { jobDistance } from './airports'
import { Job } from './getJobs'

export interface JobGroup {
    key: string
    from: string
    to: string
    distance: number
    value: number
    assignments: number
    jobs: Job[]
}

const getEntry = (lookup: Record<string, JobGroup>, job: Job): JobGroup => {
    const key = `${job.FromIcao}-${job.ToIcao}`
    const entry = lookup[key]
    if (!!entry) {
        return entry
    }
    const newEntry = {
        key,
        from: job.FromIcao,
        to: job.ToIcao,
        distance: jobDistance(job.FromIcao, job.ToIcao),
        value: 0,
        assignments: 0,
        jobs: []
    }
    lookup[key] = newEntry
    return newEntry
}

export const groupJobs = (jobs: Job[]): JobGroup[] => {
    const lookup: Record<string, JobGroup> = {}
    jobs.forEach(j => {
        const entry = getEntry(lookup, j)
        entry.jobs.push(j)
    })
    return Object.values(lookup)
}
