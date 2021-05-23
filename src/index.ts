require('dotenv').config()
import { AircraftType, getAircraft, getAircraftTypes } from './aircraft';
import { jobDistance } from './airports';
import { format } from './format';
import { getAirportRentalLookup } from './getAirportsWithAircraft'
import { getJobs } from './getJobs'
import { groupJobs } from './groupJobs'
import { priceJobs } from './priceJobs'

const printHeader = () => {
    console.info('AIRCRAFT                 \tFROM\tTO  \tPAY  \tDIST\t$/NM\t$/hr \tRENTAL\tASSIGNMENTS')
    console.info('-------------------------\t----\t----\t-----\t----\t----\t-----\t------\t-----------')
}

    ; (async () => {
        const promises = getAircraftTypes().map(async type => {
            const aircraft = getAircraft(type)
            const lookup = await getAirportRentalLookup(aircraft)
            const jobs = (await getJobs(Object.keys(lookup))).filter(j => jobDistance(j.FromIcao, j.ToIcao) <= aircraft.range)
            const groups = groupJobs(jobs).filter(g => g.jobs.some(j => j.Amount > 1))

            return priceJobs(lookup, aircraft, groups)
        })
        const all = (await Promise.all(promises)).flat()
        const highestPay = all.sort((a, b) => b.value - a.value).slice(0, 15)
        const bestPayPerHour = all.sort((a, b) => (b.value / b.hours) - (a.value / a.hours)).slice(0, 15)
        const highestPayShort = all.filter(x => x.distance <= 150).sort((a, b) => b.value - a.value).slice(0, 15)
        
        console.info('-HIGHEST PAY-\n')
        printHeader()
        highestPay.forEach(p => console.info(format(p)))

        console.info('\n\n-HIGHEST PAY (LESS THAN 150nm)-\n')
        printHeader()
        highestPayShort.forEach(p => console.info(format(p)))

        console.info('\n\n-BEST PER HOUR-\n')
        printHeader()
        bestPayPerHour.forEach(p => console.info(format(p)))
    })()
