import fetch from 'node-fetch'
import { parseString } from 'xml2js'

const toJson = async <T>(xml: string): Promise<T> => {
    return new Promise((resolve, reject) => {
        parseString(xml, function (err, result) {
            if (!!err) {
                console.error(err)
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

const BASE_URL = process.env.BASE_URL
const USER_KEY = process.env.USER_KEY

export const call = async <T>(params: Record<string, string>): Promise<T> => {
    const queryString = Object.entries(params).reduce((a, [key, value]) => `${a}&${key}=${value}`, '')
    const url = `${BASE_URL}?userkey=${USER_KEY}&format=xml&${queryString}`
    
    const response = await fetch(url)
    const xml = await response.text()
    return await toJson(xml)
}
