import express from 'express'
import { StatHandler } from '../handlers/statHandler'
import { verifyAdmin, verifyUser } from '../middleware/auth'

const handler = new StatHandler()

const statRoutes = (app: express.Application) => {
	app.get('/api/stats/hourly', handler.hourly)
	app.get('/api/stats/admin/hourly', verifyAdmin, handler.adm_hourly)
	app.get('/api/stats/admin/daily', verifyAdmin, handler.adm_daily)
	app.get('/api/stats/admin/weekly', verifyAdmin, handler.adm_weekly)
	app.get('/api/stats/admin/monthly', verifyAdmin, handler.adm_monthly)
}

export default statRoutes
