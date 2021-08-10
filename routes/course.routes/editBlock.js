const Course = require('../../models/Course')
const Block = require('../../models/Block')

module.exports = async (req, res) => {
    try {
        const {courseKey, blockKey} = req.params
        const data = req.body
        const course = await Course.findOne({keyword: courseKey})
        await Promise.all(course.blocks.map(async id => {
            const block = await Block.findById(id)
            if(block.keyword === blockKey) {
                block.title = data.title
                await block.save()
            }
            return true
        }))

        return res.status(200).json({message: 'Блок успешно изменен!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
