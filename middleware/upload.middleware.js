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

module.exports = multer({storage})