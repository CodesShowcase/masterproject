import express from 'express'
import { SecureHandler } from '../handlers/secureHandler'
import { verifyAdmin, verifyUser } from '../middleware/auth'

const handler = new SecureHandler()

const secureRoutes = (app: express.Application) => {
	app.get('/api/secure/:id', verifyUser, handler.show)
	app.put('/api/secure', verifyAdmin, handler.update)
}

export default secureRoutes
