const rimraf = require('rimraf')
const path = require('path')
const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')
const User = require('../../models/User')


module.exports = async (req, res) => {
    try {
        const {courseKey} = req.params

        rimraf(path.join(__dirname, '..', '..', 'files', courseKey), () => null)

        const users = await User.find()
        await Promise.all(users.map(async u => {
            const subIndex = await u.subscriptions.reduce(async (sI, s, i) => {
                const course = await Course.findById(s.course)
                if(course.keyword === courseKey) return i
                return sI
            }, -1)
            if(!(subIndex+1)) return false

            u.subscriptions = u.subscriptions.filter((_, i) => i !== subIndex)
            u.markModified('subscriptions')
            await u.save()
            return true
        }))

        const course = await Course.findOneAndDelete({keyword: courseKey})
        await Promise.all(course.blocks.map(async blockId => {
            const block = await Block.findByIdAndDelete(blockId)
            await Promise.all(block.lessons.map(async lessonId => {
                await Lesson.deleteOne({_id: lessonId})
                return true
            }))
            return true
        }))

        return res.status(200).json({message: 'Курс успешно удален!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
