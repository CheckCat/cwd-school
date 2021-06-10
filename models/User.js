const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  telegram: {type: String, required: true},
  phone: {type: String, required: true},
  blockchainAccount: {type: String, required: true, unique: true},
  blockchainId: {type: String, required: true, unique: true},
  subscriptions: [{course: Types.ObjectId, timeframe: Date}],
  role: {type: String, required: true}
}, {versionKey: false})

module.exports = model('User', schema)