const {Router} = require('express')
const auth = require('../../middleware/auth.middleware')
const promo = require('./promo')

const router = Router()

router.post(
	'',
	[],
	auth,
	promo
)

module.exports = router