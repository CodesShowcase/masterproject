import request from 'supertest'
import app from '../server'
import { Server } from 'http'

let server: Server

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUaGUiLCJsYXN0bmFtZSI6IkFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ2FzcHJpY2VzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHk1U1c0bDl4cWNvOWFmMHdRUUgxYU9iUkZDbjM5UktBcUNyaVFEL1VxMGg5NmhIZklxeW4yIiwidXNlcmxldmVsIjoiYWRtaW4ifSwiaWF0IjoxNjY0ODA0NzU2fQ.McR239n_mgByLuKlWs6mo9-eOKQaFBlJU4KPKFn1h_Q'

describe('Secure Handler', () => {

	server = app.listen()

	test('GET /api/secure/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/api/secure/1').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	test('PUT /api/secure calls update() and returns 401', async () => {
	const res = await request(server).put('/api/secure').send({
		userid: 1,
		avatar: 'https://localhost:3000/assets/avatar-anonymous.png',
		car: 'Mercedes S500',
		gas: 'e10',
		alarm: 999,
		tanksize: 100,
		consumption: 20,
		location: 'ARAL Bismarckstraße 2 Berlin'
	})
	expect(res.status).toBe(401)
	})

	server.close()

})
