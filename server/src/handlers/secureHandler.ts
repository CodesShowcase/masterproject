import { Request, Response } from 'express'
import { usertype, Secure, SecureStore } from '../models/secure'

const store = new SecureStore()

export class SecureHandler {

	async show(req: Request, res: Response): Promise<void> {
		try {
			if (req.params.id  as unknown as number == req.session.user?.id || req.session.user?.level == 'admin') {
				const secure = await store.show(req.params.id as unknown as number)
				res.status(200).json(secure)
			} else {
				res.status(401).json(`Users can only access their own secure settings!`)
			}
		} catch (err) {
			res
				.status(401)
				.json(`Could not find secure settings for user ${req.params.id} - ${err}`)
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const secure: Secure = {
				userid: req.body.userid as number,
				userlevel: req.body.userlevel as usertype,
				created: req.body.created as string,
				pending: req.body.pending as boolean,
				suspended: req.body.suspended as boolean,
			}
			await store.update(secure)
			res.status(200).json(`Secure settings updated!`)
		} catch (err) {
			res
				.status(401)
				.json(
					`Could not update secure settings for user ${req.body.userid} - ${err}`,
				)
		}
	}

}
