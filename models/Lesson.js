const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	video: {type: String},
	audio: [{type: String}],
	pdf: [{type: String}],
	timecodes: [{
		time: '',
		description: ''
	}],
	text: [{
		title: '',
		text: '',
		image: ''
	}]
})

module.exports = model('Lesson', schema)