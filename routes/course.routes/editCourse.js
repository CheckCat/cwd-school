const Course = require('../../models/Course')

module.exports = async (req, res) => {
    try {
        const {courseKey} = req.params
        const data = req.body
        const course = await Course.findOne({keyword: courseKey})
        course.title = data.title
        course.subscriptionPrices = data.prices.map(({price, duration}) => ({price, duration}))
        course.markModified('subscriptionPrices')
        course.subscriptionDescription = data.descriptions
        course.markModified('subscriptionDescription')
        await course.save()
        return res.status(200).json({message: 'Курс успешно изменен!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
