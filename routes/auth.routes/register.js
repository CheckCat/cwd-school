const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const {validationResult} = require('express-validator')

module.exports = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный пароль! Пароль должен состоять из не менее чем 8 символов'
			})
		}

		let {password, telegram, blockchainAccount, blockchainId} = req.body

		const candidate = await User.findOne({blockchainAccount})

		if (candidate) {
			return res.status(400).json({message: 'Такой пользователь уже существует!'})
		}

		if (telegram[0] != "@") {
			telegram = '@' + telegram
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({
			password: hashedPassword,
			telegram,
			blockchainAccount,
			blockchainId,
			subscriptions: [],
			role: 'student',
			isThanks: false,
			theme: 'dark'
		})


		await user.save()

		const token = jwt.sign(
			{userId: user.id},
			config.get('jwtSecret'),
			{expiresIn: '30d'}
		)

		return res.status(201).json({
			message: 'Вы успешно зарегистрировались!',
			token,
			theme: user.theme,
			role: user.role,
			name: user.blockchainAccount
		})

	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!', error: e})
	}
}
