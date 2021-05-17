require('dotenv').config()
import { format } from './format';
import { AircraftType, getAirportsWithAircraft } from './getAirportsWithAircraft'
import { getJobs } from './getJobs'
import { groupJobs } from './groupJobs'
import { priceJobs } from './priceJobs'

const AIRCRAFT = process.env.AIRCRAFT as AircraftType

    ; (async () => {
        const airports = await getAirportsWithAircraft(AIRCRAFT)
        const jobs = await getJobs(airports)
        const groups = groupJobs(jobs).filter(g => g.jobs.some(j => j.Amount > 1))

        const priced = priceJobs(groups)
        priced.sort((a, b) => b.value - a.value)
        console.info('FROM\tTO\tPAY\tDIST\tASSIGNMENTS')
        console.info('----\t--\t---\t----\t-----------')
        priced.forEach(p => console.info(format(p)))
    })()
