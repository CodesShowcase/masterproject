import dotenv from 'dotenv'
import { Pool, types } from 'pg'

dotenv.config()

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } =
	process.env

const pool = new Pool({
	host: DB_HOST,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASS,
	port: 5432,
})

//Disabling automatic timestamp conversion to UTC
types.setTypeParser(1114, (str) => str)

export default pool
