import pool from '../utils/database'
import crypto from 'crypto'

export enum gastype {
	e5 = 'e5',
	e10 = 'e10',
	diesel = 'diesel',
	empty = ''
}

export type Confirmation = {
	id?: number
	secret: string
	expiration: string
}

export type Dash = {
	id: number
	firstname: string
	lastname: string
	username: string
	email: string
	userlevel: string
	created: string
	pending: boolean
	suspended: boolean
}

export type User = {
	id?: number
	firstname?: string
	lastname?: string
	username: string
	email?: string
	password?: string
	avatar?: string
	car?: string
	gas?: gastype
	alarm?: number
	tanksize?: number
	mileage?: number
	yearlydriving?: number
	location?: string
}

export type Stats = {
	date: string
	members: number
}

export type TokenData = {
	id: number
	password: string
	userlevel: string
	username: string
}

export class UserStore {
	async index(): Promise<Dash[] | undefined | unknown> {
		try {
			const conn = await pool.connect()
			const pre_sql = `DROP TABLE IF EXISTS T1;
									     DROP TABLE IF EXISTS T2;
									     DROP TABLE IF EXISTS T3;
									     CREATE TEMPORARY TABLE T1 AS SELECT id, firstname, lastname, username, email FROM users;
			                 CREATE TEMPORARY TABLE T2 AS SELECT userid, userlevel, created, pending, suspended FROM secure;
									     CREATE TEMPORARY TABLE T3 AS SELECT * FROM T1 INNER JOIN T2 ON T1.id = T2.userid;`
			const sql = `SELECT id, firstname, lastname, username, email, userlevel, created, pending, suspended FROM T3 ORDER BY id ASC;`
			await conn.query(pre_sql)
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async show(id: number): Promise<User | undefined | unknown> {
		try {
			const sql = `SELECT * FROM users WHERE id=($1);`
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async create(u: User): Promise<User | undefined | unknown> {
		try {
			const secret = crypto.randomBytes(20).toString('hex')
			const sql  = `INSERT INTO users (firstname, lastname, username, email, password) VALUES('${u.firstname}',	'${u.lastname}', '${u.username}', '${u.email}', '${u.password}') RETURNING id;`
			const sql_secret = `INSERT INTO secure (userid) VALUES ((SELECT max(id) FROM users));`
			const sql_verification = `INSERT INTO verification (userid, secret, type) VALUES ((SELECT max(id) FROM users), $1, 'email') RETURNING *;`
			const conn = await pool.connect()
			await conn.query(sql)
			await conn.query(sql_secret)
			const verification = await conn.query(sql_verification, [secret])

			conn.release()

			return verification.rows[0].secret
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async confirm(secret: string): Promise<Confirmation | undefined | unknown> {
		try {
			let msg = ''
			const sql =  `SELECT * FROM verification WHERE secret=($1) AND type='email' AND CURRENT_TIMESTAMP <= expires;`
			const conn = await pool.connect()
			const result = await conn.query(sql, [secret])

			if(result.rows.length == 1) {
				const sql_active = `UPDATE secure SET pending='false' WHERE userid=${result.rows[0].userid};`
				await conn.query(sql_active)
				msg = 'The account is active!'
			} else {
				msg = 'Could not activate the account!'
			}

			conn.release()

			return msg
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async update(u: User): Promise<User | undefined | unknown> {
		try {
			const sql = `UPDATE users SET (firstname, lastname, avatar, car, gas, alarm, tanksize, mileage, yearlydriving, location) = ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE id=($1) RETURNING *;`
			const conn = await pool.connect()
			const result = await conn.query(sql, [
				u.id,
				u.firstname,
				u.lastname,
				u.avatar,
				u.car,
				u.gas,
				u.alarm,
				u.tanksize,
				u.mileage,
				u.yearlydriving,
				u.location,
			])

			if (u.password !== 'false') {
				const pw = `UPDATE users SET password = ($2) WHERE id=($1) RETURNING *;`
				await conn.query(pw, [
					u.id,
					u.password,
				])
			}

			const user = result.rows[0]

			conn.release()

			return user
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async destroy(id: number): Promise<User | undefined | unknown> {
		try {
			const sql  = `DELETE FROM preferences WHERE userid = ${id};`
			const sql2 = `DELETE FROM users WHERE id = ${id} RETURNING *;`
			const conn = await pool.connect()
			await conn.query(sql)
			const result = await conn.query(sql2)

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async stats(): Promise<Stats | undefined | unknown> {
		try {
			const sql =  `SELECT TO_CHAR(created, 'YYYY-MM-DD') AS date, COUNT(*) AS members FROM secure WHERE created >= date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '6 days' GROUP BY 1 ORDER BY date ASC;`
			const conn = await pool.connect()
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async summary(): Promise<Confirmation | undefined | unknown> {
		try {
			const sql =  `SELECT created::date AS date, COUNT(*) AS members FROM secure GROUP BY 1 ORDER BY date ASC;`
			const conn = await pool.connect()
			const result = await conn.query(sql)

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async authenticate(username: string): Promise<TokenData | null> {
		const pre_sql =  `SELECT * FROM users WHERE username=($1);`
		const conn = await pool.connect()
		const pre_result = await conn.query(pre_sql, [username])

		// There needs to be a check whether pending or suspended
		// Job for deleting everything that is pending and 12+ hours

		// Optimize CORS
		// Sanitize everything with ZOD

		if (pre_result.rows.length > 0) {
			const sql = `SELECT * FROM secure WHERE userid=${pre_result.rows[0].id};`
			const result = await conn.query(sql)
			const security_data = { 'id': pre_result.rows[0].id as number, 'password': pre_result.rows[0].password as string, 'userlevel': result.rows[0].userlevel as string, 'username': pre_result.rows[0].username as string }
			conn.release()
			return security_data
		} else {
			conn.release()
			return null
		}

	}

	async reset(username: string): Promise<User | null> {
		const sql =  `SELECT * FROM users WHERE username=($1);`
		const conn = await pool.connect()
		const result = await conn.query(sql, [username])

		conn.release()

		console.log(result)

		if (result.rows.length) {
			const user = result.rows[0]
			console.log('All OK')
			return user
		}

		return null
	}

	async verify(secret: string): Promise<Confirmation | undefined | unknown> {
		try {
			const sql =  `SELECT * FROM secret WHERE confirmationid=($1);`
			const conn = await pool.connect()
			const result = await conn.query(sql, [secret])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}
}
