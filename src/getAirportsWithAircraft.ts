import { Aircraft, AircraftType } from "./aircraft"
import { call } from "./apiCall"

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

interface AirportRental {
    icao: string
    rental: number
}

const groupBy = (items: AirportRental[]): Record<string, number> => items.reduce(
    (result, item) => ({
        ...result,
        [item.icao]: Math.min((result[item.icao] ?? 0xffffffff), item.rental)
    }),
    {} as Record<string, number>,
);

export const getAirportRentalLookup = async (aircraft: Aircraft): Promise<Record<string, number>> => {
    const results = await call<AircraftResult>({
        query: 'aircraft',
        search: 'makemodel',
        makemodel: aircraft.name
    })

    const rentals = results.AircraftItems.Aircraft
        .filter((a) => a.RentalDry[0] != '0.00' && a.RentedBy[0] === 'Not rented.')
        .map((a) => ({
            icao: a.Location[0],
            rental: parseInt(a.RentalDry[0]) + parseInt(a.Bonus[0])
        }))

    return groupBy(rentals)
}
