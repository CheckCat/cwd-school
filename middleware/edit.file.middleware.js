const fs = require('fs')
const path = require('path')
const config = require('config')

module.exports = async (req, res, next) => {
    try {
        const {courseKey, blockKey, index} = req.params
        const data = JSON.parse(req.body.data)

        data.pdf = data.pdf.filter(f => f)
        data.audio = data.audio.filter(f => f)
        data.textInfo = data.textInfo.map(({title, text, image}) => {
            if(image) {
                return {title, text, image}
            }
            return {title, text}
        })

        const pathToTemporaryStorage = path.join(__dirname, '..', config.get('temporaryStorage'))
        const pathToPdf = path.join(__dirname, '..', 'files', courseKey, blockKey, `${+index + 1}`, 'pdf')
        const pathToAudio = path.join(__dirname, '..', 'files', courseKey, blockKey, `${+index + 1}`, 'audio')
        const pathToImages = path.join(__dirname, '..', 'files', courseKey, blockKey, `${+index + 1}`, 'images')

        const pdf = fs.readdirSync(pathToPdf)
        const audio = fs.readdirSync(pathToAudio)
        const images = fs.readdirSync(pathToImages)

        await Promise.all(pdf.map(async f => {
            if(data.pdf.find(nF => nF === f)) {
                data.pdf = data.pdf.filter(fN => fN !== f)
                return true
            }
            fs.unlinkSync(path.join(pathToPdf, f))
            return true
        }))
        await Promise.all(audio.map(async f => {
            if(data.audio.find(nF => nF === f)) {
                data.audio = data.audio.filter(fN => fN !== f)
                return true
            }
            fs.unlinkSync(path.join(pathToAudio, f))
            return true
        }))
        await Promise.all(images.map(async f => {
            if(data.textInfo.find(({image}) => image === f)) {
                data.textInfo = data.textInfo.filter(({image}) => image !== f)
                return true
            }
            fs.unlinkSync(path.join(pathToImages, f))
            return true
        }))

        await Promise.all(data.pdf.map(async f => {
            fs.renameSync(path.join(pathToTemporaryStorage, f), path.join(pathToPdf, f))
            return true
        }))
        await Promise.all(data.audio.map(async f => {
            fs.renameSync(path.join(pathToTemporaryStorage, f), path.join(pathToAudio, f))
            return true
        }))
        await Promise.all(data.textInfo.map(async ({image}) => {
            image && fs.renameSync(path.join(pathToTemporaryStorage, image), path.join(pathToImages, image))
            return true
        }))

        const trashFiles = fs.readdirSync(pathToTemporaryStorage)
        await Promise.all(trashFiles.map(async f => {
            if(f === '.gitkeep') return false
            fs.unlinkSync(path.join(pathToTemporaryStorage, f))
            return true
        }))

        next()
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так', error: e})
    }
}
