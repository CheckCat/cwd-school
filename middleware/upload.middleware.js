const multer = require('multer')
const {stat, mkdir} = require('fs')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(req.body)
    stat(`files/${req.body.keyword}`, err => {
      if (!err) return cb(null, `files/${req.body.keyword}`)
      mkdir(`files/${req.body.keyword}`, err => {
        if (err) return
        cb(null, `files/${req.body.keyword}`)
      })
    })

  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'audio/mpeg') {
    return cb(null, true)
  }

  cb(null, false)
}

module.exports = multer({storage, fileFilter})