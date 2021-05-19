import { PricedJob } from './priceJobs'

const valuePerNm = (group: PricedJob): number => Math.round(group.value / group.distance)

const valuePerHr = (group: PricedJob): number => Math.round(group.value / group.hours)

export const format = (group: PricedJob): string =>
    `${group.aircraft.name.padEnd(25, ' ')}\t${group.from}\t${group.to}\t${Math.round(group.value)}\t${Math.round(group.distance)}\t${valuePerNm(group)}\t${valuePerHr(group)}\t(${Math.round(group.rental)})\t${group.assignments}`
