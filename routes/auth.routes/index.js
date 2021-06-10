const {Router} = require('express')
const {check} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const verify = require('./verify')
const login = require('./login')
const register = require('./register')
const router = Router()

router.post(
  '/verify',
  [],
  auth,
  verify
)
router.post(
  '/login',
  [
    check('password', 'Введите пароль').exists(),
  ],
  login
)
router.post(
  '/register',
  [
    check('email', 'Введите адрес электронной почты корректно').normalizeEmail().isEmail(),
    check('phone', 'Введите корректный номер телефона').isMobilePhone(),
    check('password', 'Введите пароль').isLength({min: 8}),
  ],
  register
)

module.exports = router