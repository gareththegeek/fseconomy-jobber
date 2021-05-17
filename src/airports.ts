import * as fs from 'fs'
import * as path from 'path'
import * as csv from '@fast-csv/parse'
import { point, distance } from '@turf/turf'

interface Airport {
    icao: string
    lat: number
    lon: number
}

const airports: Record<string, Airport> = {}

fs.createReadStream(path.resolve(__dirname, 'data', 'icaodata.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => airports[row['icao']] = {
        icao: row['icao'],
        lat: parseFloat(row['lat']),
        lon: parseFloat(row['lon'])
    })

export const jobDistance = (fromIcao: string, toIcao: string): number => {
    const fromLocation = airports[fromIcao]
    const toLocation = airports[toIcao]
    const from = point([fromLocation.lon, fromLocation.lat])
    const to = point([toLocation.lon, toLocation.lat])
    return distance(from, to, { units: 'nauticalmiles' })
}
