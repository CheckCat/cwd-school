const {Router} = require('express')
const User = require('../../models/User')
const auth = require('../../middleware/auth.middleware')
const getFile = require('./getFile')

const router = Router()

router.get(
	'/:course/:block/:lesson/:type/:filename',
	[],
	auth,
	getFile
)

module.exports = router