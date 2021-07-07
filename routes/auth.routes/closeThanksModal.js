module.exports = async (req, res) => {
    try {
        const user = req.user

        user.isThanks = false

        await user.save()

        return res.status(200).json({})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так!'})
    }
}
