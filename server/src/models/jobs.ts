import pool from '../utils/database'
import dotenv from 'dotenv'

dotenv.config()

export class JobsStore {
	// This will produce every minute a snapshot of the currently active prices
	// The snapshot will drastically improve access times and can also be hold in memory, so you don't need something additional like a Redis
	// Further improvement is possible if you add a "lights out switch" which indicates if the pretrol station is currently active
	// The commit is neccessary to lock the table while updating
	async snapshot(): Promise<null | undefined> {
		try {
			const sql = `SET TimeZone = '${process.env.TZ}';
				DROP TABLE IF EXISTS t1;
				DROP TABLE IF EXISTS t2;
				CREATE TEMP TABLE t1 AS SELECT (array_agg(id ORDER BY date DESC))[1] AS id, stid, max(date) FROM gasprices WHERE date < CURRENT_TIMESTAMP GROUP BY stid;
	      CREATE TABLE t2 AS SELECT * FROM gasprices WHERE id IN (SELECT id FROM t1) ORDER BY date DESC;
	      BEGIN;
	      DROP TABLE IF EXISTS snapshot;
	      ALTER TABLE t2 RENAME to snapshot;
	      COMMIT;`
			const conn = await pool.connect()
			await conn.query(sql)

			conn.release()

			console.log('Snapshot created!')

			return null
		} catch (err) {
			console.log(err)
		}
	}

	// At first sight this does not make much sense, but it actually does, since some petrol stations don't carry every fuel and then it is marked with a 0
	// So it has to created and then updated to give you the correct values
	async hourly(): Promise<null | undefined> {
		try {
			const sql = `SET TimeZone = '${process.env.TZ}';
				DROP TABLE IF EXISTS t1;
				DROP TABLE IF EXISTS t2;
				DROP TABLE IF EXISTS t3;
				DROP TABLE IF EXISTS t4;
				CREATE TEMP TABLE t1 AS SELECT date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '1 Hour' AS timeframe, max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5,
				max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10, max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel
				from gasprices WHERE date >= date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '1 Hour' AND date < date_trunc('hour',CURRENT_TIMESTAMP);
				CREATE TEMP TABLE t2 AS SELECT max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5 from gasprices WHERE
				date >= date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '1 Hour' AND date < date_trunc('hour',CURRENT_TIMESTAMP) AND e5 != 0;
				CREATE TEMP TABLE t3 AS SELECT max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10 from gasprices WHERE
				date >= date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '1 Hour' AND date < date_trunc('hour',CURRENT_TIMESTAMP) AND e10 != 0;
				CREATE TEMP TABLE t4 AS SELECT max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel from gasprices WHERE
				date >= date_trunc('hour',CURRENT_TIMESTAMP) - INTERVAL '1 Hour' AND date < date_trunc('hour',CURRENT_TIMESTAMP) AND diesel != 0;
				UPDATE t1 SET maxe5 = t2.maxe5, avge5 = t2.avge5, mine5 = t2.mine5 FROM t2;
				UPDATE t1 SET maxe10 = t3.maxe10, avge10 = t3.avge10, mine10 = t3.mine10 FROM t3;
				UPDATE t1 SET maxdiesel = t4.maxdiesel, avgdiesel = t4.avgdiesel, mindiesel = t4.mindiesel FROM t4;
				INSERT INTO hourly (SELECT * FROM t1);`
			const conn = await pool.connect()
			await conn.query(sql)

			conn.release()

			console.log('Hourly created!')

			return null
		} catch (err) {
			console.log(err)
		}
	}

	async daily(): Promise<null | undefined> {
		try {
			const sql = `SET TimeZone = '${process.env.TZ}';
				DROP TABLE IF EXISTS t1;
				DROP TABLE IF EXISTS t2;
				DROP TABLE IF EXISTS t3;
				DROP TABLE IF EXISTS t4;
				CREATE TEMP TABLE t1 AS SELECT date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '1 Day' AS timeframe, max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5,
				max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10, max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel
				from gasprices WHERE date >= date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '1 Day' AND date < date_trunc('day',CURRENT_TIMESTAMP);
				CREATE TEMP TABLE t2 AS SELECT max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5 from gasprices WHERE
				date >= date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '1 Day' AND date < date_trunc('day',CURRENT_TIMESTAMP) AND e5 != 0;
				CREATE TEMP TABLE t3 AS SELECT max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10 from gasprices WHERE
				date >= date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '1 Day' AND date < date_trunc('day',CURRENT_TIMESTAMP) AND e10 != 0;
				CREATE TEMP TABLE t4 AS SELECT max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel from gasprices WHERE
				date >= date_trunc('day',CURRENT_TIMESTAMP) - INTERVAL '1 Day' AND date < date_trunc('day',CURRENT_TIMESTAMP) AND diesel != 0;
				UPDATE t1 SET maxe5 = t2.maxe5, avge5 = t2.avge5, mine5 = t2.mine5 FROM t2;
				UPDATE t1 SET maxe10 = t3.maxe10, avge10 = t3.avge10, mine10 = t3.mine10 FROM t3;
				UPDATE t1 SET maxdiesel = t4.maxdiesel, avgdiesel = t4.avgdiesel, mindiesel = t4.mindiesel FROM t4;
				INSERT INTO daily (SELECT * FROM t1);`
			const conn = await pool.connect()
			await conn.query(sql)

			conn.release()

			console.log('Daily created!')

			return null
		} catch (err) {
			console.log(err)
		}
	}

	// Same as above, just for the weekly values
	async weekly(): Promise<null | undefined> {
		try {
			const sql = `SET TimeZone = '${process.env.TZ}';
				DROP TABLE IF EXISTS t1;
				DROP TABLE IF EXISTS t2;
				DROP TABLE IF EXISTS t3;
				DROP TABLE IF EXISTS t4;
				CREATE TEMP TABLE t1 AS SELECT date_trunc('week',CURRENT_TIMESTAMP) - INTERVAL '1 Week' AS timeframe, max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5,
				max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10, max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel
				from gasprices WHERE date >= date_trunc('week',CURRENT_TIMESTAMP) - INTERVAL '1 Week' AND date < date_trunc('week',CURRENT_TIMESTAMP);
				CREATE TEMP TABLE t2 AS SELECT max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5 from gasprices WHERE
				date >= date_trunc('week',CURRENT_TIMESTAMP) - INTERVAL '1 Week' AND date < date_trunc('week',CURRENT_TIMESTAMP) AND e5 != 0;
				CREATE TEMP TABLE t3 AS SELECT max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10 from gasprices WHERE
				date >= date_trunc('week',CURRENT_TIMESTAMP) - INTERVAL '1 Week' AND date < date_trunc('week',CURRENT_TIMESTAMP) AND e10 != 0;
				CREATE TEMP TABLE t4 AS SELECT max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel from gasprices WHERE
				date >= date_trunc('week',CURRENT_TIMESTAMP) - INTERVAL '1 Week' AND date < date_trunc('week',CURRENT_TIMESTAMP) AND diesel != 0;
				UPDATE t1 SET maxe5 = t2.maxe5, avge5 = t2.avge5, mine5 = t2.mine5 FROM t2;
				UPDATE t1 SET maxe10 = t3.maxe10, avge10 = t3.avge10, mine10 = t3.mine10 FROM t3;
				UPDATE t1 SET maxdiesel = t4.maxdiesel, avgdiesel = t4.avgdiesel, mindiesel = t4.mindiesel FROM t4;
				INSERT INTO weekly (SELECT * FROM t1);`
			const conn = await pool.connect()
			await conn.query(sql)

			conn.release()

			console.log('Weekly created!')

			return null
		} catch (err) {
			console.log(err)
		}
	}

	async monthly(): Promise<null | undefined> {
		try {
			const sql = `SET TimeZone = '${process.env.TZ}';
				DROP TABLE IF EXISTS t1;
				DROP TABLE IF EXISTS t2;
				DROP TABLE IF EXISTS t3;
				DROP TABLE IF EXISTS t4;
				CREATE TEMP TABLE t1 AS SELECT date_trunc('month',CURRENT_TIMESTAMP) - INTERVAL '1 Month' AS timeframe, max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5,
				max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10, max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel
				from gasprices WHERE date >= date_trunc('month',CURRENT_TIMESTAMP) - INTERVAL '1 Month' AND date < date_trunc('month',CURRENT_TIMESTAMP);
				CREATE TEMP TABLE t2 AS SELECT max(e5) AS maxe5, avg(e5)::SMALLINT AS avge5, min(e5) AS mine5 from gasprices WHERE  date >= date_trunc('month',CURRENT_TIMESTAMP) - INTERVAL '1 Month'
				AND date < date_trunc('month',CURRENT_TIMESTAMP) AND e5 != 0;
				CREATE TEMP TABLE t3 AS SELECT max(e10) AS maxe10, avg(e10)::SMALLINT AS avge10, min(e10) AS mine10 from gasprices WHERE  date >= date_trunc('month',CURRENT_TIMESTAMP) - INTERVAL '1 Month'
				AND date < date_trunc('month',CURRENT_TIMESTAMP) AND e10 != 0;
				CREATE TEMP TABLE t4 AS SELECT max(diesel) AS maxdiesel, avg(diesel)::SMALLINT AS avgdiesel, min(diesel) AS mindiesel from gasprices WHERE
				date >= date_trunc('month',CURRENT_TIMESTAMP) - INTERVAL '1 Month' AND date < date_trunc('month',CURRENT_TIMESTAMP) AND diesel != 0;
				UPDATE t1 SET maxe5 = t2.maxe5, avge5 = t2.avge5, mine5 = t2.mine5 FROM t2;
				UPDATE t1 SET maxe10 = t3.maxe10, avge10 = t3.avge10, mine10 = t3.mine10 FROM t3;
				UPDATE t1 SET maxdiesel = t4.maxdiesel, avgdiesel = t4.avgdiesel, mindiesel = t4.mindiesel FROM t4;
				INSERT INTO monthly (SELECT * FROM t1);`
			const conn = await pool.connect()
			await conn.query(sql)

			conn.release()

			console.log('Monthly created!')

			return null
		} catch (err) {
			console.log(err)
		}
	}
}
