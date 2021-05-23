const {Schema, model} = require('mongoose')

const schema = new Schema({
  owner: {type: String},
  video: {type: String},
  timecodes: [{type: String}],
  audio: {type: String},
  pdf: [{type: String}],
  text: [{type: String}]
})

module.exports = model('Lesson', schema)