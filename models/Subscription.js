const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, ref: 'Course'},
  duration: {type: Number, required: true},
  price: {type: Number, required: true, unique: true}
})

module.exports = model('Subscription', schema)