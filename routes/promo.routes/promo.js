const Course = require('../../models/Course')

module.exports = async (req, res) => {
	const realPromocode = 'старт'
	const keyCourse = 'first'
	const date = new Date(2021, 8, 7)
	const {promocode} = req.body
	const user = req.user

	try {
		if(realPromocode !== promocode) return res.status(400).json({message: 'Неверный промокод!'})
		if(Date.now() > date) return res.status(300).json({message: 'Промокод просрочен!'})

		const course = await Course.findOne({keyword: keyCourse})
		const a = user.subscriptions.find(({course: courseSub}) => courseSub.toString() === course._id.toString())
                if(a && Number(a.timeframe) >= Date.now()){
			return res.status(300).json({message: 'У вас уже есть подписка на этот курс!'})
		}
		user.subscriptions.push({course: course.id, timeframe: date})
		user.markModified('subscriptions')
                user.isThanks = true
		await user.save()
		return res.status(200).json({message: 'Курс успешно добавлен, перезагрузите страницу!'})
	} catch(e) {
	  	console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так!', error: e})
	}
}
