const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')

module.exports = async (req, res) => {
    try {
        const {courseKey, blockKey} = req.params
        let {index} = req.params

        const data = JSON.parse(req.body.data)
        data.pdf = data.pdf.filter(f => f)
        data.audio = data.audio.filter(f => f)
        data.textInfo = data.textInfo.map(({title, text, image}) => {
            if(image) {
                return {title, text, image}
            }
            return {title, text}
        })
        const course = await Course.findOne({keyword: courseKey})
        const block = await course.blocks.reduce(async (accum, id) => {
            const block = await Block.findById(id)
            if(block.keyword === blockKey) return block

            return accum
        }, null)

        const lesson = await block.lessons.reduce(async (accum, id) => {
            const lesson = await Lesson.findById(id)
            if(+lesson.index === +index+1) return lesson

            return accum
        }, null)


        lesson.title = data.title
        lesson.description = data.description

        lesson.video = data.video
        lesson.timecodes = data.timecodes.map(({time, description}) => ({time, description}))

        lesson.pdf = data.pdf.map(f => `files/${courseKey}/${blockKey}/${+index+1}/pdf/${f}`)
        lesson.markModified('pdf')

        lesson.audio = data.audio.map(f => `files/${courseKey}/${blockKey}/${+index+1}/audio/${f}`)
        lesson.markModified('audio')

        lesson.text = data.textInfo.map(({title, text, image}) => {
            if(image) {
                return {title, text, image: `files/${courseKey}/${blockKey}/${+index+1}/images/${image}`}
            }
            return {title, text}
        })
        lesson.markModified('text')

        await lesson.save()

        return res.status(200).json({message: 'Урок успешно изменен!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
