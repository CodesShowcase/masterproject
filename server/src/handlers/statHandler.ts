import { Request, Response } from 'express'
import { StatStore } from '../models/stats'

const store = new StatStore()

const mytoken = (token: string) => {
	const decoded = token.split(' ')[1]
	const result = JSON.parse(
		Buffer.from(decoded.split('.')[1], 'base64').toString(),
	).user
	return result
}

export class StatHandler {

	async hourly(req: Request, res: Response): Promise<void> {
		try {
			const stats = await store.hourly()
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get hourly stats - ${err}`)
		}
	}

	async adm_hourly(req: Request, res: Response): Promise<void> {
		try {
			const stats = await store.adm_hourly()
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get advanced hourly stats - ${err}`)
		}
	}

	async adm_daily(req: Request, res: Response): Promise<void> {
		try {
			const stats = await store.adm_daily()
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get advanced weekly stats - ${err}`)
		}
	}

	async adm_weekly(req: Request, res: Response): Promise<void> {
		try {
			const stats = await store.adm_weekly()
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get advanced weekly stats - ${err}`)
		}
	}

	async adm_monthly(req: Request, res: Response): Promise<void> {
		try {
			const stats = await store.adm_monthly()
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get advanced monthly stats - ${err}`)
		}
	}

}
