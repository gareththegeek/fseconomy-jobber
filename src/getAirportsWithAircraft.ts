import { call } from "./apiCall"

export type AircraftType = 'Cessna 208 Caravan' | 'Socata TBM 930 (MSFS)' | 'Beechcraft King Air 350'

interface AircraftResult {
    AircraftItems: {
        '$': {
            query: string
            total: string
            xmlns: string
            'xmlns:xsi': string
            'xmlns:schemalocation': string
        },
        Aircraft: [{
            SerialNumber: [string],
            MakeModel: [string],
            Registration: [string],
            Owner: [string],
            Location: [string],
            LocationName: [string],
            Home: [string],
            SalePrice: [string],
            SellbackPrice: [string],
            Equipment: [string],
            RentalDry: [string],
            RentalWet: [string],
            RentalType: [string],
            Bonus: [string],
            RentalTime: [string],
            RentedBy: [string],
            FuelPct: [string],
            NeedsRepair: [string],
            AirframeTime: [string],
            EngineTime: [string],
            TimeLast100hr: [string],
            LeasedFrom: [string],
            MonthlyFee: [string],
            FeeOwed: [string]
        }]
    },
}

export const getAirportsWithAircraft = async (type: AircraftType): Promise<string[]> => {
    const aircraft = await call<AircraftResult>({
        query: 'aircraft',
        search: 'makemodel',
        makemodel: type
    })

    const airports = aircraft.AircraftItems.Aircraft
        .filter((a) => a.RentalDry[0] != '0.00' && a.RentedBy[0] === 'Not rented.')
        .map((a) => a.Location[0])

    return [...new Set(airports)]
}
