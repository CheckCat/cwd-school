const Course = require('../../models/Course')
const Block = require('../../models/Block')


module.exports = async (req, res) => {
    try {
        const keyword = req.params.keyword
        const course = await Course.findOne({keyword})
        const {title, subscriptionPrices, subscriptionDescription} = course
        const blocks = await Promise.all(course.blocks.map(async id => {
            const {keyword, title} = await Block.findById(id);
            return {keyword, title}
        }))
        return res.status(200).json({keyword: course.keyword, title, subscriptionPrices, subscriptionDescription, blocks})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
