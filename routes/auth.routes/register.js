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
				message: 'Некорректные данные при попытке регистрации'
			})
		}
		
		let {email, password, telegram, phone, blockchainAccount, blockchainId} = req.body
		
		const candidate = await User.findOne({blockchainAccount})
		
		if (candidate) {
			return res.status(400).json({message: 'Такой пользователь уже существует'})
		}
		
		if (telegram[0] != "@") {
			telegram = telegram.split('')
			telegram.unshift('@')
			telegram = telegram.join('')
		}
		
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({
			email,
			password: hashedPassword,
			telegram,
			phone,
			blockchainAccount,
			blockchainId,
			subscriptions: {},
			role: 'student'
		})
		
		
		await user.save()
		
		const token = jwt.sign(
			{userId: user.id},
			config.get('jwtSecret'),
			{expiresIn: '1h'}
		)
		
		return res.status(201).json({token, userId: user.id, role: user.role, name: user.blockchainAccount})
		
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
	}
}