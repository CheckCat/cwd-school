const Course = require('../models/Course')
const Block = require('../models/Block')

module.exports = async (user) => {
	const courses = await Promise.all(user.subscriptions.map(async ({course, timeframe}) => {
		let {keyword, title, subscriptionPrices, subscriptionInfo, blocks} = await Course.findById(course)
		blocks = await Promise.all(blocks.map(async id => {
			const {keyword, title, lessons} = await Block.findById(id)
			return {keyword, title, lessonsLength: lessons.length}
		}))
		const prices = subscriptionPrices
		const info = subscriptionInfo
		return {keyword, title, timeframe, prices, info, blocks}
	}))
	return courses
}
