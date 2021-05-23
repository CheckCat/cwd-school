const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Course = require('../models/Course')
const auth = require('../middleware/auth.middleware')
const router = Router()
/*
* {
    "email": "vadim@mail.ru",
    "password": "12345678910",
    "telegram": "@1231412",
    "phone": "+79178003676",
    "blockchainAccount": "eminence-grise",
    "blockchainId": "11527",
    "subscriptions": {
    },
    "role": "admin",
}*/
router.post(
  '/verify',
  [],
  auth,
  async (req, res) => {
    try {
      return res.status(401).json({message: 'Не авторизован'})
    } catch (e) {
      return res.status(500).json({message: 'Что-то пошло не так'})
    }
  }
)
router.post(
  '/login',
  [
    check('password', 'Введите пароль').exists()
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const {blockchainAccount, password} = req.body
      const user = await User.findOne({blockchainAccount})

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
      }

      user.subscriptions.forEach(id => {
        const course = Course.findById(id)
        console.log(course)
      })

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )
      return res.status(200).json({token, userId: user.id, role: user.role, blockchainAccount: user.blockchainAccount})

    } catch (e) {
      console.log(e)
      return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
)
router.post(
  '/register',
  [
    check('email', 'Введите адрес электронной почты корректно').normalizeEmail().isEmail(),
    check('phone', 'Введите корректный номер телефона').isMobilePhone(),
    check('password', 'Введите пароль').isLength({min: 8}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке регистрации'
        })
      }

      let {email, password, telegram, phone, blockchainAccount, blockchainId} = req.body

      const candidate = await User.findOne({blockchainAccount})

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь уже существует'})
      }

      if (telegram[0] != "@") {
        telegram = telegram.split('')
        telegram.unshift('@')
        telegram = telegram.join('')
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword,
        telegram,
        phone,
        blockchainAccount,
        blockchainId,
        subscriptions: {},
        role: 'student'
      })

      console.log(user)

      await user.save()

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      return res.status(201).json({token, userId: user.id, role: user.role, blockchainAccount: user.blockchainAccount})

    } catch (e) {
      console.log(e)
      return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
)

module.exports = router