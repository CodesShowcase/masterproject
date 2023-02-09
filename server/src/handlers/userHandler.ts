import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { gastype, User, UserStore } from '../models/users'
import bcrypt from 'bcrypt'

const store = new UserStore()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

export class UserHandler {

	async index(req: Request, res: Response): Promise<void> {
		try {
			const users = await store.index()
			res.status(200).json(users)
		} catch (err) {
			res.status(401).json(`Could not get users - ${err}`)
		}
	}

	async show(req: Request, res: Response): Promise<void> {
		try {
			if (req.params.id  as unknown as number == req.session.user?.id || req.session.user?.level == 'admin') {
				const user = await store.show(req.params.id as unknown as number)
				res.status(200).json(user)
			} else {
				res.status(401).json(`Users [or admins] can only access their own id!`)
			}
		} catch (err) {
			res.status(401).json(`Could not find user ${req.params.id} - ${err}`)
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const user: User = {
				firstname: req.body.firstname as string,
				lastname: req.body.lastname as string,
				username: req.body.username as string,
				email: req.body.email as string,
				password: req.body.password as string,
			}
			const hash = bcrypt.hashSync(
				user.password + (process.env.BCRYPT_SALT as string),
				parseInt(process.env.SALT_ROUNDS as string),
			)
			user.password = hash
			const verify = await store.create(user) as string
			await transporter.sendMail({
				from: `${process.env.GMAIL_SENDER}`,
				to: `"${req.body.firstname} ${req.body.lastname}"<${req.body.email}>`,
				subject: "Please confirm your emailaddress ✔",
				text: `Please enter the following url in your browser http://localhost:3080/api/users/confirm/${verify} to confirm your emailaddress!`,
				html: `<h2>Welcome!</h2><a href="http://localhost:3080/api/users/confirm/${verify}">Please click to verify your emailaddress!</a>`,
			})
			res.status(200).json("Account created!")
		} catch (err) {
			res.status(401).json(`Could not add new user - ${err}`)
		}
	}

	async confirm(req: Request, res: Response): Promise<void> {
		try {
			const confirm = await store.confirm(req.params.secret as unknown as string)
			res.status(200).json(confirm)
		} catch (err) {
			res.status(401).json(`This is no valid confirmation link! - ${err}`)
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			if (req.params.id as unknown as number  == req.session.user?.id || req.session.user?.level == 'admin') {
				const user: User = {
					id: req.body.id as number,
					firstname: req.body.firstname as string,
					lastname: req.body.lastname as string,
					username: req.body.username as string,
					email: req.body.email as string,
					password: req.body.password as string,
					avatar: req.body.avatar as string,
					car: req.body.car as string,
					gas: req.body.gas as gastype,
					alarm: req.body.alarm as number,
					tanksize: req.body.tanksize as number,
					mileage: req.body.mileage as number,
					yearlydriving: req.body.yearlydriving as number,
					location: req.body.location as string,
				}
				if (req.body.password.length > 8) {
					const hash = bcrypt.hashSync(
						user.password + (process.env.BCRYPT_SALT as string),
						parseInt(process.env.SALT_ROUNDS as string),
					)
					user.password = hash
				} else {
					user.password = 'false'
				}
				await store.update(user)
				res.status(200).json(`User settings updated!`)
			} else {
				res.status(401).json(`Users can only update their own id!`)
			}
		} catch (err) {
			res.status(401).json(`Could not update user - ${err}`)
		}
	}

	async destroy(req: Request, res: Response): Promise<void> {
		try {
			if (req.params.id  as unknown as number == req.session.user?.id || req.session.user?.level == 'admin') {
				const deleted = await store.destroy(req.body.id as unknown as number)
				res.status(200).json(deleted)
			} else {
				res.status(401).json(`Users can only delete their own id!`)
			}
		} catch (err) {
			res.status(401).json(`Could not delete user ${req.body.id} - ${err}`)
		}
	}

	async stats(req: Request, res: Response): Promise<void> {
		try {
			const stats = await store.stats()
			res.status(200).json(stats)
		} catch (err) {
			res.status(401).json(`Could not get dashboard stats - ${err}`)
		}
	}

	async summary(req: Request, res: Response): Promise<void> {
		try {
			const summary = await store.summary()
			res.status(200).json(summary)
		} catch (err) {
			res.status(401).json(`Could not get dashboard summary - ${err}`)
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const user: User = {
				username: req.body.username as string,
				password: req.body.password as string,
			}
			const loginUser = await store.authenticate(user.username)
			console.log(loginUser)
			if (loginUser !== null) {
				if (
					bcrypt.compareSync(
						user.password + (process.env.BCRYPT_SALT as string),
						loginUser.password as string,
					)
				) {
					console.log(req.session)
					req.session.user = { id: loginUser.id, level: loginUser.userlevel, username: loginUser.username }
					res.status(200).json({ "id": loginUser.id , "username": loginUser.username, "userlevel": loginUser.userlevel })
				} else {
					res.status(401).json(`Passwords do not match!`)
				}
			} else {
				res.status(401).json(`This user does not exist!`)
			}
		} catch (err) {
			res.status(401).json(`Could not login user - ${err}`)
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		try {
			// Alternatively destroy the cookie
			// req.session.cookie.expires = new Date().getTime()
			req.session.destroy((err) => {
				res.status(200).json("Logged out")
			})
		} catch (err) {
			res.status(401).json(`Could not logout user - ${err}`)
		}
	}

	async reset(req: Request, res: Response): Promise<void> {
		try {
			//const user: User = {
			//	username: req.body.username as string,
			//}
			const user: User = { username: req.params.username as string }
			const loginUser = await store.reset(user.username)
			console.log(loginUser)
			await transporter.sendMail({
				from: '"OnFuelSaver 👻" <centurio.moriturus@gmail.com>',
				to: "nhaumer@mail.com",
				subject: "Hello ✔",
				text: "Hello world?",
				html: "<b>Hello world?</b>",
			})
			res.status(200).json("All OK")
		} catch (err) {
			res.status(401).json(`Could not login user - ${err}`)
		}
	}

	async verify(req: Request, res: Response): Promise<void> {
		try {
			const verify = await store.verify(req.params.secret as unknown as string)
			res.status(200).json(verify)
		} catch (err) {
			res.status(401).json(`This is no valid reset link! - ${err}`)
		}
	}

}
