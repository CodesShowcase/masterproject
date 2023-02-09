import { StatStore } from '../models/stats'

const store = new StatStore()

describe('Stat Model', () => {

	test('should have an hourly method', () => {
		expect(store.hourly).toBeDefined()
	})

	test('should have a adm_hourly method', () => {
		expect(store.adm_hourly).toBeDefined()
	})

  test('should have a adm_daily method', () => {
		expect(store.adm_daily).toBeDefined()
	})

  test('should have a adm_weekly method', () => {
    expect(store.adm_weekly).toBeDefined()
  })

  test('should have a adm_monthly method', () => {
    expect(store.adm_monthly).toBeDefined()
  })

	test('hourly method should return hourly stats', async () => {
		const res = await store.hourly()
    expect(res).toBeDefined()
	})

  test('adm_hourly method should return hourly stats for admin', async () => {
		const res = await store.adm_hourly()
    expect(res).toBeDefined()
	})

  test('adm_daily method should return daily stats for admin', async () => {
		const res = await store.adm_daily()
    expect(res).toBeDefined()
	})

  test('adm_weekly method should return weekly stats for admin', async () => {
		const res = await store.adm_weekly()
    expect(res).toBeDefined()
	})

  test('adm_monthly method should return monthly stats for admin', async () => {
    const res = await store.adm_monthly()
    expect(res).toBeDefined()
  })

})
