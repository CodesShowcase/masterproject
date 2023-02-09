import { Request, Response } from 'express'
import { Location, InfoStore } from '../models/info'
import NodeGeocoder from 'node-geocoder'

const store = new InfoStore()
const geocoder = NodeGeocoder({ provider: 'google', apiKey: process.env.GOOGLE_API })

export class InfoHandler {

	async price(req: Request, res: Response): Promise<void> {
		try {
			const price = await store.price(req.params.id as unknown as string)
			res.status(200).json(price)
		} catch (err) {
			res
				.status(401)
				.json(`Could not find gas prices for station ${req.params.id} - ${err}`)
		}
	}

	async info(req: Request, res: Response): Promise<void> {
		try {
			const loc = await geocoder.geocode(req.body.position)
			const location: Location = {
				lat: loc[0].latitude as number,
				lng: loc[0].longitude as number,
			}
			const stats = await store.info(location)
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get stations for the location - ${err}`)
		}
	}

	async stations(req: Request, res: Response): Promise<void> {
		try {
			const loc = await geocoder.geocode(req.body.position)
			const location: Location = {
				lat: loc[0].latitude as number,
				lng: loc[0].longitude as number,
			}
			const stats = await store.stations(location)
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get stations for the location - ${err}`)
		}
	}

}
