const Course = require('../models/Course')

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const data = JSON.parse(req.body.data)

		const possible = await Course.findOne({keyword: data.keyword})
		if (possible) {
			return res.status(400).json({message: 'Курс с таким ключевым словом уже существует'})
		}

		next()
	} catch (e) {
		console.log(e)
		return res.status(400).json({message: 'Что-то пошло не так при проверке наличия курса', error: e})
	}
}
