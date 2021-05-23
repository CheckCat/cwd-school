const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  keyword: {type: String, required: true, unique: true},
  title: {type: String, required: true, unique: true},
  lessons: [{type: Types.ObjectId, ref: 'Lesson'}]
})

module.exports = model('Course', schema)