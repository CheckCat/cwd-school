const rimraf = require('rimraf')
const path = require('path')
const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')

module.exports = async (req, res) => {
    try {
        const {courseKey, blockKey} = req.params
        const course = await Course.findOne({keyword: courseKey})
        rimraf(path.join(__dirname, '..', '..', 'files', courseKey, blockKey), () => null)
        const blocks = await course.blocks.reduce(async (accumP, id) => {
            const accum = await accumP
            const block = await Block.findById(id)
            if(block.keyword === blockKey) {
                await Promise.all(block.lessons.map(async id => {
                    await Lesson.findByIdAndDelete(id)
                    return
                }))
                await Block.findByIdAndDelete(id)
                return accum
            }
            accum.push(id)
            return accum
        }, Promise.resolve([]))

        course.blocks = blocks
        course.markModified('blocks')
        await course.save()
        return res.status(200).json({message: 'Блок успешно удален!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
