import { parseBooleans } from 'xml2js/lib/processors'
import { jobDistance } from './airports'
import { call } from './apiCall'

const MIN_DISTANCE = parseInt(process.env.MIN_DISTANCE ?? '0')

interface JobResult {
    IcaoJobsFrom: {
        '$': {
            query: string
            total: string
            xmlns: string
            'xmlns:xsi': string
            'xmlns:schemalocation': string
        },
        Assignment: [{
            Id: [string],
            Location: [string],
            ToIcao: [string],
            FromIcao: [string],
            Amount: [string],
            UnitType: [string],
            Commodity: [string],
            Pay: [string],
            Expires: [string],
            ExpireDateTime: [string],
            Express: [string],
            PtAssignment: [string],
            Type: [string],
            AircraftId: [string]
        }]
    }
}

export interface Job {
    Id: string,
    Location: string,
    ToIcao: string,
    FromIcao: string,
    Amount: number
    UnitType: string,
    Commodity: string,
    Pay: number,
    Expires: string,
    ExpireDateTime: string,
    Express: boolean,
    PtAssignment: boolean,
    Type: string,
    AircraftId: string
}

export const getJobs = async (airports: string[]): Promise<Job[]> => {
    const jobs = await call<JobResult>({
        query: 'icao',
        search: 'jobsfrom',
        icaos: airports.join('-')
    })

    return jobs.IcaoJobsFrom.Assignment.map(a => ({
        Id: a.Id[0],
        Location: a.Location[0],
        ToIcao: a.ToIcao[0],
        FromIcao: a.FromIcao[0],
        Amount: parseInt(a.Amount[0]),
        UnitType: a.UnitType[0],
        Commodity: a.Commodity[0],
        Pay: parseFloat(a.Pay[0]),
        Expires: a.Expires[0],
        ExpireDateTime: a.ExpireDateTime[0],
        Express: parseBooleans(a.Express[0]),
        PtAssignment: parseBooleans(a.PtAssignment[0]),
        Type: a.Type[0],
        AircraftId: a.AircraftId[0]
    }))
        .filter(a => a.Type === 'Trip-Only' || a.Type === 'VIP')
        .filter(a => a.UnitType === 'passengers')
        .filter(a => jobDistance(a.FromIcao, a.ToIcao) > MIN_DISTANCE)
        //.filter(a => jobDistance(a.FromIcao, a.ToIcao) < 300)
    //.filter(a => a.PtAssignment)
    // .filter(a => {
    //     const dist = jobDistance(a.FromIcao, a.ToIcao)
    //     return dist > MIN_DISTANCE && dist < MAX_DISTANCE
    // })
}