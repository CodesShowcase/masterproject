import { Station, InfoStore } from '../models/info'

const store = new InfoStore()

const populatedTestCoordinates: Station = {
  lat: 52.425911,
  lng: 13.394271,
}

describe('Info Model', () => {

	test('should have an price method', () => {
		expect(store.price).toBeDefined()
	})

	test('should have a stations method', () => {
		expect(store.stations).toBeDefined()
	})

	test('index method should return a price by id', async () => {
		const res = await store.price('057827cd-6583-4a3a-a461-f8546073fd02')
    expect(res).toBeDefined()
	})

	test('show method should return a station by lat and lng', async () => {
		const res = await store.stations(populatedTestCoordinates)
    expect(res).toBeDefined()
	})

})
