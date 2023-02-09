import express from 'express'
import { InfoHandler } from '../handlers/infoHandler'

const handler = new InfoHandler()

const infoRoutes = (app: express.Application) => {
	app.get('/api/info/:id', handler.price)
	app.post('/api/info', handler.info)
	app.post('/api/info/stations', handler.stations)
}

export default infoRoutes
