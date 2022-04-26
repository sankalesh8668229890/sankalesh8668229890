const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const AuthorSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	title: {
		type: String, required: true,
		enum: ["Mr", "Mrs", "Miss"]
	},
	email: {
		type: String,
		unique: true
	},
	password: { type: String, required: true }

})

module.exports = mongoose.model('Author', AuthorSchema)




