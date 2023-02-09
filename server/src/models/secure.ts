import pool from '../utils/database'

export enum usertype {
	admin = 'admin',
	user = 'user'
}

export type Secure = {
	id?: number
	userid?: number
	userlevel?: usertype
	created?: string
	pending?: boolean
	suspended?: boolean
}

export class SecureStore {

	async show(userid: number): Promise<Secure | undefined | unknown> {
		try {
			const sql = `SELECT * FROM secure WHERE userid=($1);`
			const conn = await pool.connect()
			const result = await conn.query(sql, [userid])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async update(s: Secure): Promise<Secure | undefined | unknown> {
		try {
			const sql =	`UPDATE secure SET (pending, suspended) = ($2, $3) WHERE userid=($1) RETURNING *;`
			const conn = await pool.connect()
			const result = await conn.query(sql, [
				s.userid,
				s.pending,
				s.suspended,
			])
			const secure = result.rows[0]

			conn.release()

			return secure
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

}
