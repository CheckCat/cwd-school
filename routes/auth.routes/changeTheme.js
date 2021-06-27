module.exports = async (req, res) => {
	try {
		const user = req.user
		
		user.theme = req.body.theme
		
		await user.save()
		
		return res.status(200).json({})
	} catch (e) {
		return res.status(500).json({message: 'Что-то пошло не так!'})
	}
}