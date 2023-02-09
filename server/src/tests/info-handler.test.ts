import request from 'supertest'
import app from '../server'
import { Server } from 'http'

let server: Server

describe('Info Handler', () => {

	server = app.listen()

	test('GET /api/info/005056a9-779e-1ee9-81a5-0ae97d8d86da calls price() and returns 200', async () => {
		const res = await request(server).get('/api/info/005056a9-779e-1ee9-81a5-0ae97d8d86da')
		expect(res.status).toBe(200)
	})

	test('POST /api/info calls stations() and returns 200', async () => {
		const res = await request(server).post('/api/info').send({
			position: "Sonnenallee 24 Berlin"
		})
		expect(res.status).toBe(200)
	})

	server.close()

})
