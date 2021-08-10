const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')
const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')

module.exports = async (req, res) => {
    try {
        const {courseKey, blockKey, index} = req.params

        const course = await Course.findOne({keyword: courseKey})
        const block = await course.blocks.reduce(async (accum, id) => {
            const block = await Block.findById(id)
            if(block.keyword === blockKey) return block

            return accum
        }, {})
        const lessons = await Promise.all(block.lessons.map(async id => {
            const lesson = await Lesson.findById(id)
            return lesson
        }))

        const lessonIds = await lessons.sort((a, b) => a.index - b.index).reduce(async (accumP, lesson, i) => {
            const accum = await accumP
            if(+lesson.index === +index+1) {
                rimraf(path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${i+1}`), () => null)
                await Lesson.findByIdAndDelete(lesson._id)
                return accum
            }
            if(+lesson.index > +index+1) {

                const pastPath = path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${i+1}`)
                const newPath = path.join(__dirname, '..', '..', 'files', courseKey, blockKey, `${i}`)
                fs.rename(pastPath, newPath, (e) => e ? console.log(e) : console.log(`Перетащил файлы из ${i+1} в ${i}`))
                lesson.audio = lesson.audio.map(a => { // поменять
                    const pathArray = a.split('/')
                    pathArray[3]--
                    return pathArray.join('/')
                })
                lesson.markModified('audio')

                lesson.pdf = lesson.pdf.map(f => {
                    const pathArray = f.split('/')
                    pathArray[3]--
                    return pathArray.join('/')
                })
                lesson.markModified('pdf')

                lesson.text = lesson.text.map(t => {
                    const pathArray = t.image?.split('/')
                    if(!pathArray) return t
                    pathArray[3]--
                    return {text: t.text, title: t.title, image: pathArray.join('/')}
                })
                lesson.markModified('text')
                lesson.index = `${+lesson.index-1}`

                await lesson.save()

            }
            accum.push(lesson._id)
            return accum
        }, Promise.resolve([]))

        block.lessons = lessonIds
        block.markModified('lessons')
        await block.save()
        return res.status(200).json({message: 'Урок успешно удален!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
