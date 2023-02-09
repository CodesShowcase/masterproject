import pool from '../utils/database'

export type Price = {
	id: number
	batchid: string
	stid: string
	e5: number
	e10: number
	diesel: number
	date: Date
}

export type Location = {
	id?: number
	lat: number
	lng: number
}

export type Info = {
	id?: number
	name?: string
	brand?: string
	street?: string
	house_number?: string
	post_code?: string
	place?: string
	lat: number
	lng: number
	ot_json?: string
	distance?: number
	date: Date
	e5: number
	e10: number
	diesel: number
}

export type Station = {
	id?: number
	name?: string
	brand?: string
	street?: string
	house_number?: string
	post_code?: string
	place?: string
	lat: number
	lng: number
	ot_json?: string
	distance?: number
}

export class InfoStore {

	async price(id: string): Promise<Price | undefined | unknown> {
		try {
			const sql = `SELECT date AT TIME ZONE 'Europe/Berlin' AS date, e5, e10, diesel FROM snapshot WHERE stid=($1);`
			const conn = await pool.connect()
			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async info(l: Location): Promise<Info[] | undefined | unknown> {
		try {
			const pre_sql1 = `DROP TABLE IF EXISTS T1;`
			const pre_sql2 = `CREATE TEMPORARY TABLE T1 AS SELECT *, earth_distance(ll_to_earth(($1), ($2)), ll_to_earth(lat,lng))::INTEGER distance FROM gasstations ORDER BY distance ASC LIMIT 11;`
			const pre_sql3 = `DROP TABLE IF EXISTS T2;`
			const pre_sql4 = `CREATE TEMPORARY TABLE T2 AS SELECT stid as id, date AT TIME ZONE 'Europe/Berlin' AS date, e5, e10, diesel FROM snapshot WHERE stid IN (SELECT id FROM T1);`
			const sql   = `SELECT * FROM T1 JOIN T2 USING (id) ORDER BY distance ASC;`
			const conn = await pool.connect()
			await conn.query(pre_sql1)
			await conn.query(pre_sql2, [l.lat, l.lng])
			await conn.query(pre_sql3)
			await conn.query(pre_sql4)
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async stations(l: Location): Promise<Station[] | undefined | unknown> {
		try {
			const sql = `SELECT *, earth_distance(ll_to_earth(($1), ($2)), ll_to_earth(lat,lng))::INTEGER distance
									FROM gasstations ORDER BY distance ASC LIMIT 11;`
			const conn = await pool.connect()
			const result = await conn.query(sql, [l.lat, l.lng])

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

}
