const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			throw new Error('token')
		}

		const {userId} = jwt.verify(token, config.get('jwtSecret'))

		const candidate = await User.findById(userId)

		if (candidate.role !== 'admin') {
			res.status(400).json({message: 'У вас нет доступа'})
		}

		next()
	} catch (e) {
		return res.status(400).json({message: 'Что-то пошло не так при идентификации'})
	}
}
