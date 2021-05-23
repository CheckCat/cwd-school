const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new Error('token')
    }
    const {userId} = jwt.verify(token, config.get('jwtSecret'))

    const user = await User.findOne({_id: userId})
    if(!user) {
      throw new Error('user')
    }

    const newToken = jwt.sign(
      {userId},
      config.get('jwtSecret'),
      {expiresIn: '1h'}
    )
    return res.status(200).json({token: newToken, userId, role: user.role, blockchainAccount: user.blockchainAccount})
  } catch(e) {
    console.log(e)
    next()
  }
}