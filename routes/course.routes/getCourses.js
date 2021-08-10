const Course = require('../../models/Course')
const Block = require('../../models/Block')

module.exports = async (req, res) => {
	try {
		const courses = await Course.find()

		res.status(200).json({
			courses: courses.map(({keyword, title, subscriptionDescription, subscriptionPrices}) => ({
				keyword,
				title,
				subscriptionDescription,
				subscriptionPrices
			}))
		})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так!', error: e})
	}
}
