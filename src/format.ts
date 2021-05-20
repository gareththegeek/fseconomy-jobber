import { PricedJob } from './priceJobs'

const name = (value: string): string => value.padEnd(25, " ");
const icao = (value: string): string => value.padStart(4, " ");
const pay = (value: number): string => Math.round(value).toString().padStart(5, ' ')
const dist = (value: number): string => Math.round(value).toString().padStart(4, ' ')
const valuePerNm = (group: PricedJob): string => Math.round(group.value / group.distance).toString().padStart(4, ' ')
const valuePerHr = (group: PricedJob): string => Math.round(group.value / group.hours).toString().padStart(5, ' ')
const rental = (rental: number): string => `(${Math.round(rental)})`.padStart(6, ' ')

export const format = (group: PricedJob): string =>
  `${name(group.aircraft.name)}\t${icao(group.from)}\t${icao(group.to)}\t${pay(group.value)}\t${dist(group.distance)}\t${valuePerNm(group)}\t${valuePerHr(group)}\t${rental(group.rental)}\t${group.assignments}`;
