const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  password: {type: String, required: true},
  telegram: {type: String, required: true},
  blockchainAccount: {type: String, required: true, unique: true},
  blockchainId: {type: String, required: true, unique: true},
  subscriptions: [{course: Types.ObjectId, timeframe: Date}],
  role: {type: String, required: true},
  theme: {type: String, required: true}
}, {versionKey: false})

module.exports = model('User', schema)