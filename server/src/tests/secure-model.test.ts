import { usertype, Secure, SecureStore } from '../models/secure'

const store = new SecureStore()

const populatedTestSecure: Secure = {
  userid: 1,
  userlevel: 'admin' as usertype,
	created: '2022-12-01 00:00:01+01',
	pending: false,
	suspended: false
}

describe('Secure Model', () => {

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

  test('should have a update method', () => {
    expect(store.update).toBeDefined()
  })

	test('show method should return secure user data by id', async () => {
		const res = await store.show(1)
    expect(res).toBeDefined()
	})

  test('update method should update secure user data by id', async () => {
		const res = await store.update(populatedTestSecure)
    expect(res).toBeDefined()
	})

})
