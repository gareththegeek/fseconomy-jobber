export interface Aircraft {
    name: string
    capacity: number
    speed: number
    range: number
}

type T_CESSNA_208 = 'Cessna 208 Caravan'
type T_TBM_930 = 'Socata TBM 930 (MSFS)'
type T_KINGAIR_350 = 'Beechcraft King Air 350'
type T_CITATION_LONGITUDE = 'Cessna Citation Longitude'

const CESSNA_208 = 'Cessna 208 Caravan'
const TBM_930 = 'Socata TBM 930 (MSFS)'
const KINGAIR_350 = 'Beechcraft King Air 350'
const CITATION_LONGITUDE = 'Cessna Citation Longitude'

export type AircraftType = T_CESSNA_208 | /*T_TBM_930 |*/ T_KINGAIR_350 | T_CITATION_LONGITUDE

const aircraft: Record<AircraftType, Aircraft> = {
    [CESSNA_208]: {
        name: CESSNA_208,
        capacity: 13,
        speed: 185,
        range: 723
    },
    // [TBM_930]: {
    //     name: TBM_930,
    //     capacity: 7,
    //     speed: 330,
    //     range: 1135
    // },
    [KINGAIR_350]: {
        name: KINGAIR_350,
        capacity: 14,
        speed: 312,
        range: 1739
    },
    [CITATION_LONGITUDE]: {
        name: CITATION_LONGITUDE,
        capacity: 12,
        speed: 483,
        range: 3500
    }
}

export const getAircraft = (type: AircraftType): Aircraft => aircraft[type]

export const getAircraftTypes = (): AircraftType[] => Object.keys(aircraft) as AircraftType[]
