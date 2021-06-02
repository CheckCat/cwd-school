const fs = require('fs')
const {Router} = require('express')
const checkAccess = require('../middleware/file.middleware')
const User = require('../models/User')

const router = Router()

router.get(
  '/:course/:filename',
  [],
  checkAccess,
  async (req, res) => {
    const {course, filename} = req.params
    try {
      const fileStream = fs.createReadStream(`files/${course}/${filename}`);

      fileStream.on('open', () => {
        const type = filename.split('.')[1]
        switch (type) {
          case 'pdf':
            res.contentType('application/pdf')
            break
          case 'mp3':
            res.contentType('audio/mpeg')
            break
          default:
            res.contentType('application/json')
        }
        fileStream.pipe(res);
      })
      fileStream.on('error', () => {
        return res.status(402).json({e: 'asd'})
      })
    } catch (e) {
      return res.status(400).json({e: 'asd'})
    }
  }
)
module.exports = router