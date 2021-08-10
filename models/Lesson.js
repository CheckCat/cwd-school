const {Schema, model} = require('mongoose')

const schema = new Schema({
	title: {type: String},
	description: {type: String},
	video: {type: String},
	audio: [{type: String}],//поменять
	pdf: [{type: String}],
	index: {type: String},
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
