const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')
const User = require('../../models/User')

// СТАРАЯ НЕИСПОЛЬЗУЕМАЯ ЛОГИКА. НЕ ИСПОЛЬЗОВАТЬ ИЛИ ПОМЕНЯТЬ!!!

module.exports = async (req, res) => {
	try {
		const data = JSON.parse(req.body.data)

		const blocks = await Promise.all(data.blocks.map(async b => {
			const {keyword, title} = b
			const lessons = await Promise.all(b.lessons.map(async l => {
				const lesson = new Lesson({...l})
				await lesson.save()

				return lesson._id
			}))
			const block = new Block({keyword, title, lessons})
			await block.save()

			return block._id
		}))

		const subscriptionDescription = [...data.subscriptions.description]
		const subscriptionPrices = [...data.subscriptions.prices]

		const course = new Course({
			keyword: data.keyword,
			title: data.title,
			blocks,
			subscriptionPrices,
			subscriptionDescription
		})

		await course.save()

		const admin = await User.findOne({role: 'admin'})
		admin.subscriptions.push({course: course._id, timeframe: new Date(3000, 1, 1)})
		admin.markModified('subscriptions')
		await admin.save()

		return res.status(201).json({message: 'Курс был создан!'})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так!', error: e})
	}
}
