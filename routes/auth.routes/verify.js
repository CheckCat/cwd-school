const getCourses = require('../../modules/getCourses')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res) => {
	try {
		const user = req.user
		const userId = req.user._id
		const courses = await getCourses(user)
		
		const newToken = jwt.sign(
			{userId},
			config.get('jwtSecret'),
			{expiresIn: '1h'}
		)
		return res.status(200).json({token: newToken, role: user.role, name: user.blockchainAccount, courses})
	} catch (e) {
		return res.status(500).json({message: 'Что-то пошло не так'})
	}
}