const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, ref: 'Course'},
  duration: {type: Number, required: true}
})

module.exports = model('Sub', schema)