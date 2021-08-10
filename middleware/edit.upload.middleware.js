const multer = require('multer')
const config = require('config')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        return cb(null, config.get('temporaryStorage'))
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const data = JSON.parse(req.body.data)

    if(file.fieldname === 'pdf' || file.fieldname === 'audio') {
        if(data[file.fieldname].find(f => f === file.originalname)) return cb(null, true)
    }
    if(file.fieldname === 'image') {
        if(data.textInfo.find(({image}) => image === file.originalname)) return cb(null, true)
    }
    return cb(null, false)
}

module.exports = multer({storage, fileFilter})
