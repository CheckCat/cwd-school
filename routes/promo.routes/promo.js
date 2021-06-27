const Course = require('../../models/Course')

module.exports = async (req, res) => {
	const realPromocode = ''
	const keyCourse = ''
	const date = new Date(2021, 6, 30)
	const {promocode} = req.body
	const user = req.user
	return res.status(200).json({message: 'Промокодик'})
	try {
		const course = await Course.findOne({keyword: keyCourse})
		if(realPromocode === promocode) {
			if(Date.now() > date) return res.status(300).json({message: 'Промокод просрочен!'})
			user.subscriptions.push({course: course.id, timeframe: date})
			user.markModified('subscriptions')
			await user.save()
			return res.status(200).json({message: 'Курс успешно добавлен!'})
		}
		return res.status(300).json({message: 'Неверный промокод!'})
	} catch(e) {
	  console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так!'})
	}
	
	
	
}