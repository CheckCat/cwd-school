const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // const token = req.headers.authorization.split(' ')[1]
    // if (!token) {
    //   throw new Error('token')
    // }
    //
    // const {userId} = jwt.verify(token, config.get('jwtSecret'))
    // const userId =
    // const user = await User.findById(userId)
    console.log(req.params)

    next()
  } catch {
    return res.status(400).json({e: 'У вас нет доступа'})
  }
}