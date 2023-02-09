import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization
		const token = authorizationHeader ? authorizationHeader.split(' ')[1] : ''
		jwt.verify(token, process.env.JWT_SECRET as string)
		next()
	} catch (error) {
		res.status(401).send('There was a problem with the token')
	}
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
	try {
		req.session.cookie.expires = new Date(Date.now() + 3600000)
		if (req.session.user?.level !== 'admin' && req.session.user?.level !== 'user') {
			res.status(401).send('You do not have access to the user area')
			next(new Error('You do not have user access level'))
		} else {
			next()
		}
	} catch (error) {
		res.status(401).send('There was a problem with you access level')
	}
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
	try {
		req.session.cookie.expires = new Date(Date.now() + 3600000)
		if (req.session.user?.level !== 'admin') {
			res.status(401).send('You do not have access to the admin area')
			next(new Error('You do not have admin access level'))
		} else {
			next()
		}
	} catch (error) {
		res.status(401).send('There was a problem with you access level')
	}
}