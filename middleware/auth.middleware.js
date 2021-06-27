const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(400).json({message: 'Не авторизован'})
		}
		
		const {userId} = jwt.verify(token, config.get('jwtSecret'))
		
		const user = await User.findById(userId)
		if (!user) {
			return res.status(400).json({message: 'Не авторизован'})
		}
		
		req.user = user
		
		next()
	} catch (e) {
		console.log(e)
		return res.status(400).json({message: 'Что-то пошло не так'})
	}
}