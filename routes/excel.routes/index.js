const {Router} = require('express')
const identification = require('../../middleware/identification.middleware')
const getExcel = require('./getExcel')

const router = Router()

router.post(
    '',
    [],
    identification,
    getExcel
)

module.exports = router
