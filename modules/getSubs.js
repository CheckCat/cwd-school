const fetch = require('node-fetch')
const User = require('../models/User')
const Course = require('../models/Course')
const MaxOp = require('../models/MaxOp')
const config = require('config')

const getSubs = async max_op => {
	try {
		const response = await fetch(`${config.get('flaskUrl')}/api/get_subscriptions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				max_op
			})
		})
		const data = await response.json()
		console.log(data)
		if (data.subscriptions.length) {
			await Promise.all(data.subscriptions.map(async ({buyer, amount}) => {
					const user = await User.findOne({blockchainId: buyer})
					if (!user) return

					const courses = await Course.find()
					const course = courses.find(c => c.subscriptionPrices.find(({price}) => price === +amount))
					if (!course) return

					const duration = course.subscriptionPrices.find(({price}) => price === +amount).duration
					let isEmpty = true
					await Promise.all(user.subscriptions.map(async (sub, index) => {
						if (String(sub.course) === String(course.id)) {
							const oldDuration = sub.timeframe
							const date =
								oldDuration.getTime() < Date.now()
									?
									new Date().setMonth(new Date().getMonth() + duration)
									:
									oldDuration.setMonth(oldDuration.getMonth() + duration)
							user.subscriptions[index].timeframe = date
							user.markModified('subscriptions')
							user.isThanks = true
							await user.save()
							isEmpty = false
						}
						return
					}, []))

					if (isEmpty) {
						user.subscriptions.push({course: course.id, timeframe: new Date().setMonth(new Date().getMonth() + duration)})
						user.markModified('subscriptions')
						user.isThanks = true
						await user.save()
					}
					return
				}
			))
		}

		if (data.max_op !== max_op) {
			const maxOpModel = await MaxOp.findOne({maxOp: max_op})
			maxOpModel.maxOp = data.max_op
			await maxOpModel.save()
		}

		setTimeout(getSubs, 25000, data.max_op)
	} catch (e) {
		console.log(e)
		setTimeout(getSubs, 25000, max_op)
	}
}

module.exports = getSubs

