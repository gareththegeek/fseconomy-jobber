import { JobGroup } from './groupJobs'

export const format = (group: JobGroup): string =>
    `${group.from}\t${group.to}\t${Math.round(group.value)}\t${Math.round(group.distance)}\t${Math.round(group.value/group.distance)}\t${group.assignments}`
