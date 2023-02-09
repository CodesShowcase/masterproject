import { JobsStore } from '../models/jobs'

const store = new JobsStore()

describe('Jobs Model', () => {

	test('should have a snapshot method', () => {
		expect(store.snapshot).toBeDefined()
	})

  test('should have a hourly method', () => {
		expect(store.hourly).toBeDefined()
	})

  test('should have a daily method', () => {
		expect(store.daily).toBeDefined()
	})

  test('should have a weekly method', () => {
    expect(store.weekly).toBeDefined()
  })

  test('should have a monthly method', () => {
    expect(store.monthly).toBeDefined()
  })

})
