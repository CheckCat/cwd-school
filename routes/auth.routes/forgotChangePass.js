const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const getCourses = require('../../modules/getCourses')
const config = require('config')

const {validationResult} = require('express-validator')

module.exports = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный пароль!'
			})
		}
		let {password, blockchainAccount} = req.body

		const user = await User.findOne({blockchainAccount})

		if (!user) {
			return res.status(400).json({message: 'Такого пользователя не существует!'})
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		user.password = hashedPassword

		await user.save()

		const token = jwt.sign(
			{userId: user.id},
			config.get('jwtSecret'),
			{expiresIn: '1h'}
		)

		const courses = await getCourses(user)
		const filteredCourses = courses.filter(c => Number(c.timeframe) > Date.now())

		return res.status(202).json({message: 'Пароль успешно изменен!', token, theme: user.theme, role: user.role, name: blockchainAccount, thanksModalIsOpen: user.isThanks, courses: filteredCourses})

	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
	}
}
