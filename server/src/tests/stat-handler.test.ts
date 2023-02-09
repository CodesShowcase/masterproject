import request from 'supertest'
import app from '../server'
import { Server } from 'http'

let server: Server

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUaGUiLCJsYXN0bmFtZSI6IkFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ2FzcHJpY2VzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHk1U1c0bDl4cWNvOWFmMHdRUUgxYU9iUkZDbjM5UktBcUNyaVFEL1VxMGg5NmhIZklxeW4yIiwidXNlcmxldmVsIjoiYWRtaW4ifSwiaWF0IjoxNjY0ODA0NzU2fQ.McR239n_mgByLuKlWs6mo9-eOKQaFBlJU4KPKFn1h_Q'

describe('Stat Handler', () => {

	server = app.listen()

	test('GET /api/stats/hourly calls hourly() and returns 200', async () => {
		const res = await request(server).get('/api/stats/hourly')
		expect(res.status).toBe(200)
	})

	test('GET /api/stats/admin/hourly calls adm_hourly() and returns 200', async () => {
		const res = await request(server).get('/api/stats/admin/hourly').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	test('GET /api/stats/admin/daily calls adm_daily() and returns 200', async () => {
		const res = await request(server).get('/api/stats/admin/daily').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	test('GET /api/stats/admin/weekly calls adm_weekly() and returns 200', async () => {
		const res = await request(server).get('/api/stats/admin/weekly').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	test('GET /api/stats/admin/monthly calls adm_monthly() and returns 200', async () => {
		const res = await request(server).get('/api/stats/admin/monthly').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	server.close()

})
