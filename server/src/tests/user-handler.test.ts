import request from 'supertest'
import app from '../server'
import { Server } from 'http'

let server: Server

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUaGUiLCJsYXN0bmFtZSI6IkFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ2FzcHJpY2VzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHk1U1c0bDl4cWNvOWFmMHdRUUgxYU9iUkZDbjM5UktBcUNyaVFEL1VxMGg5NmhIZklxeW4yIiwidXNlcmxldmVsIjoiYWRtaW4ifSwiaWF0IjoxNjY0ODA0NzU2fQ.McR239n_mgByLuKlWs6mo9-eOKQaFBlJU4KPKFn1h_Q'

describe('User Handler', () => {

	server = app.listen()

	test('GET /api/users/ calls index() and returns 200', async () => {
		const res = await request(server).get('/api/users/').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	test('GET /api/users/1 calls show() and returns 200', async () => {
		const res = await request(server).get('/api/users/1').set('Authorization', 'bearer ' + token)
		expect(res.status).toBe(200)
	})

	test('POST /api/users/ calls create() and returns 200', async () => {
	const res = await request(server).post('/api/users/').send({
		firstname: 'Mr.',
		lastname: 'Johnny',
		username: 'mrjohnny',
		email: 'johnny@mr.com',
		password: '12345678',
	})
	expect(res.status).toBe(200)
	})

	test('PUT /api/users/ calls update() and returns 401', async () => {
	const res = await request(server).put('/api/users/').send({
		id: 2,
		firstname: 'Mr.',
		lastname: 'Johnny',
		username: 'mrjohnny',
		email: 'johnny@mr.com',
		password: '12345678',
	})
	expect(res.status).toBe(401)
	})

	test('POST /api/users/login calls authenticate() and returns 200', async () => {
	const res = await request(server).post('/api/users/login').send({
		username: 'mrjohnny',
		password: '12345678',
	})
	expect(res.status).toBe(200)
	})

	test('DELETE /api/users/ calls update() and returns 200', async () => {
	const res = await request(server).delete('/api/users/').send({
		id: 2
	})
	expect(res.status).toBe(401)
	})

	server.close()

})
