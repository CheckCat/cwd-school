const fs = require('fs')
const path = require('path')
const Course = require('../../models/Course')
const Block = require('../../models/Block')

module.exports = async (req, res) => {
    try {
        const {courseKey} = req.params
        const {keyword, title, index} = req.body
        const course = await Course.findOne({keyword: courseKey})
        const maybe = await course.blocks.reduce(async (accum, id) => {
            const block = await Block.findById(id)

            if(block.keyword === keyword) {
                return true
            }
            return accum
        }, false)

        if(maybe) return res.status(300).json({message: 'В курсе уже есть такой блок! Попробуйте другое ключевое слово.'})
        const blocks = course.blocks
        const block = new Block({
            keyword,
            title,
            lessons: []
        })
        await block.save()
        course.blocks = [...blocks.slice(0, index), block._id, ...blocks.slice(index)]
        course.markModified('blocks')
        await course.save()
        fs.mkdir(path.join(__dirname, '..', '..', 'files', courseKey, keyword), () => null)
        return res.status(200).json({message: 'Курс успешно изменен!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
