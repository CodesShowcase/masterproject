import express from 'express'
import { UserHandler } from '../handlers/userHandler'
import { verifyAdmin, verifyUser } from '../middleware/auth'

const handler = new UserHandler()

const userRoutes = (app: express.Application) => {
	app.get('/api/users', verifyAdmin, handler.index)
	app.get('/api/users/:id', verifyUser, handler.show)
	app.post('/api/users', handler.create)
	app.put('/api/users', verifyUser, handler.update)
	app.delete('/api/users', verifyUser, handler.destroy)
	app.post('/api/users/stats', verifyAdmin, handler.stats)
	app.post('/api/users/summary', verifyAdmin, handler.summary)
	app.get('/api/users/confirm/:secret', handler.confirm)
	app.post('/api/users/login', handler.login)
	app.post('/api/users/logout', verifyUser, handler.logout)
	app.get('/api/users/reset/:username', handler.reset)
	app.get('/api/users/verify/:secret', handler.verify)
}

export default userRoutes
