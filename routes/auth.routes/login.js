const User = require('../../models/User')
const getCourses = require('../../modules/getCourses')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const config = require('config')

module.exports = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректные данные при входе в систему!'
			})
		}

		const {blockchainAccount, password} = req.body
		const user = await User.findOne({blockchainAccount})

		if (!user) {
			return res.status(400).json({message: 'Пользователь не найден!'})
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({message: 'Неверный пароль, попробуйте снова!'})
		}

		const courses = await getCourses(user)
		const filteredCourses = courses.filter(c => Number(c.timeframe) > Date.now())

		const token = jwt.sign(
			{userId: user.id},
			config.get('jwtSecret'),
			{expiresIn: '30d'}
		)
		return res.status(200).json({message: 'Вы успешно вошли!', token, theme: user.theme, role: user.role, name: user.blockchainAccount, thanksModalIsOpen: user.isThanks, courses: filteredCourses})

	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!', error: e})
	}
}
