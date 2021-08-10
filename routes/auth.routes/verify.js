const getCourses = require('../../modules/getCourses')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res) => {
	try {
		const user = req.user
		const userId = req.user._id
		const courses = await getCourses(user)
		const filteredCourses = courses.filter(c => Number(c.timeframe) > Date.now())

		const newToken = jwt.sign(
			{userId},
			config.get('jwtSecret'),
			{expiresIn: '30d'}
		)
		return res.status(200).json({token: newToken, theme: user.theme, role: user.role, name: user.blockchainAccount, thanksModalIsOpen: user.isThanks, courses: filteredCourses})
	} catch (e) {
		return res.status(500).json({message: 'Что-то пошло не так!', error: e})
	}
}
