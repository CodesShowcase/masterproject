import { JobsStore } from '../models/jobs'
import schedule from 'node-schedule'

const store = new JobsStore()

const jobs = () => {

	schedule.scheduleJob('59 * * * * *', () => {
		store.snapshot()
		console.log('Snapshoting!')
	})

	schedule.scheduleJob('00 * * * *', () => {
		store.hourly()
		console.log('Creating Hourly!')
	})

	schedule.scheduleJob('00 00 * * *', () => {
		store.daily()
		console.log('Creating Daily!')
	})

	schedule.scheduleJob('00 00 * * 01', () => {
		store.weekly()
		console.log('Creating Weekly!')
	})

	schedule.scheduleJob('00 00 01 * *', () => {
		store.monthly()
		console.log('Creating Monthly!')
	})

}

export default jobs
