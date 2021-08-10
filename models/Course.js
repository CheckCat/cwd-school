const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	keyword: {type: String, required: true, unique: true},
	title: {type: String},
	blocks: [{type: Types.ObjectId, ref: 'Block'}],
	subscriptionPrices: [{price: Number, duration: Number}],
	subscriptionDescription: [{type: String}]
})

module.exports = model('Course', schema)
