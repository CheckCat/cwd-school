const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	keyword: {type: String, required: true},
	title: {type: String},
	lessons: [{type: Types.ObjectId, ref: 'Lesson'}]
})

module.exports = model('Block', schema)
