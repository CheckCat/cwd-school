const {Router} = require('express')
const {check} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const verify = require('./verify')
const login = require('./login')
const register = require('./register')
const forgotChangePass = require('./forgotChangePass')
const changeTheme = require('./changeTheme')
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
    check('password', 'Введите пароль').isLength({min: 8}),
  ],
  register
)
router.post(
  '/forgot_change_pass',
  [
    check('password', 'Введите пароль').isLength({min: 8}),
  ],
  forgotChangePass
)
router.post(
  '/theme',
  [],
  auth,
  changeTheme
)

module.exports = router