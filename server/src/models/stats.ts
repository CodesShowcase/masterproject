import pool from '../utils/database'

export type Stat = {
	timeframe: Date
	e5high: number
	e5avg: number
	e5low: number
	e10high: number
	e10avg: number
	e10low: number
	dieselhigh: number
	dieselavg: number
	diesellow: number
}

export class StatStore {

	async hourly(): Promise<Stat | undefined | unknown> {
		try {
			const conn = await pool.connect()
			const sql = `SELECT timeframe AT TIME ZONE 'Europe/Berlin' AS timeframe, e5high, e5avg, e5low, e10high, e10avg, e10low, dieselhigh, dieselavg,
									diesellow FROM hourly WHERE date_trunc('hour',timeframe) = date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '1 Hour';`
			const result = await conn.query(sql)

			conn.release()

			return result.rows[0]
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async adm_hourly(): Promise<Stat[] | undefined | unknown> {
		try {
			const conn = await pool.connect()
			const sql = `SELECT timeframe AT TIME ZONE 'Europe/Berlin' AS timeframe, e5high, e5avg, e5low, e10high, e10avg, e10low, dieselhigh, dieselavg,
									diesellow FROM hourly WHERE date_trunc('hour',timeframe) >= date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '25 Hours'
 									AND date_trunc('hour',timeframe) < date_trunc('hour',CURRENT_TIMESTAMP);`
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async adm_daily(): Promise<Stat[] | undefined | unknown> {
		try {
			const conn = await pool.connect()
			const sql = `SELECT timeframe AT TIME ZONE 'Europe/Berlin' AS timeframe, e5high, e5avg, e5low, e10high, e10avg, e10low, dieselhigh, dieselavg,
									diesellow FROM daily WHERE date_trunc('day',timeframe) >= date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '8 Days'
 									AND date_trunc('day',timeframe) < date_trunc('day',CURRENT_TIMESTAMP);`
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async adm_weekly(): Promise<Stat[] | undefined | unknown> {
		try {
			const conn = await pool.connect()
			const sql = `SELECT timeframe AT TIME ZONE 'Europe/Berlin' AS timeframe, e5high, e5avg, e5low, e10high, e10avg, e10low, dieselhigh, dieselavg,
									diesellow FROM weekly WHERE date_trunc('week',timeframe) >= date_trunc('week',CURRENT_TIMESTAMP) - INTERVAL '13 Weeks'
 									AND date_trunc('week',timeframe) < date_trunc('week',CURRENT_TIMESTAMP);`
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

	async adm_monthly(): Promise<Stat[] | undefined | unknown> {
		try {
			const conn = await pool.connect()
			const sql = `SELECT timeframe AT TIME ZONE 'Europe/Berlin' AS timeframe, e5high, e5avg, e5low, e10high, e10avg, e10low, dieselhigh, dieselavg,
									diesellow FROM monthly WHERE date_trunc('month',timeframe) >= date_trunc('month',CURRENT_TIMESTAMP) - INTERVAL '13 Months'
 									AND date_trunc('month',timeframe) < date_trunc('month',CURRENT_TIMESTAMP);`
			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			console.log(err)
			return `${err}`
		}
	}

}
