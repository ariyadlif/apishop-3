var mongoose = require('mongoose')

var ProductSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},

	slug: {
		type: String,
	},

	desc: {
		type: String,
		required: true
	},

	categories: {
		type: String,
		required: true
	},

	price: {
		type: Number,
		required: true
	},

},
{
	timestamps: true
})

var Product = module.exports = mongoose.model('products', ProductSchema)