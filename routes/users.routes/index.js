const {Router} = require('express')
const identification = require('../../middleware/identification.middleware')
const getAllStudents = require('./getAllStudents')

const router = Router()

router.get(
    '/all',
    [],
    identification,
    getAllStudents
)

module.exports = router
