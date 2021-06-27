const {Schema, model} = require('mongoose')

const schema = new Schema({
	maxOp: {type: Number, required: true}
})

module.exports = model('MaxOp', schema)