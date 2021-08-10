const fs = require('fs')
const path = require('path')
const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')

module.exports = async (req, res) => {
    try {
        const {courseKey, blockKey} = req.params
        const {description, title, index} = req.body
        const course = await Course.findOne({keyword: courseKey})
        const block = await course.blocks.reduce(async (accum, id) => {
            const block = await Block.findById(id)
            if(block.keyword === blockKey) return block

            return accum
        }, {})
        const lesson = new Lesson({
            title,
            description,
            video: '',
            timecodes: [],
            audio: [],
            pdf: [],
            text: [],
            index: `${+index+1}`
        })

        const lessons = await Promise.all(block.lessons.map(async id => {
            const lesson = await Lesson.findById(id)
            return lesson
        }))
        await Promise.all(lessons.sort((a, b) => a.index - b.index).reverse().map(async (lesson, i, array) => {
            if(array.length - 1 - i < +index) return false

            const pastPath = path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${array.length-i}`)
            const newPath = path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${array.length+1-i}`)
            fs.renameSync(pastPath, newPath)

            lesson.audio = lesson.audio.map(a => { // поменять
                const pathArray = a.split('/')
                pathArray[3]++
                return pathArray.join('/')
            })
            lesson.markModified('audio')
            lesson.pdf = lesson.pdf.map(a => {
                const pathArray = a.split('/')
                pathArray[3]++
                return pathArray.join('/')
            })
            lesson.markModified('pdf')
            lesson.text = lesson.text.map(t => {
                const pathArray = t.image?.split('/')
                if(!pathArray) return t
                pathArray[3]++
                return {text: t.text, title: t.title, image: pathArray.join('/')}
            })
            lesson.markModified('text')
            lesson.index = `${+lesson.index + 1}`

            await lesson.save()

            return
        }))

        await lesson.save()
        fs.mkdirSync(path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${+index+1}`))
        fs.mkdirSync(path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${+index+1}`, 'audio'))
        fs.mkdirSync(path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${+index+1}`, 'pdf'))
        fs.mkdirSync(path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${+index+1}`, 'images'))

        block.lessons.push(lesson._id)

        block.markModified('lessons')
        await block.save()
        return res.status(200).json({message: 'Урок успешно создан!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
