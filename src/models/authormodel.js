const mongoose = require('mongoose')
require("mongoose-types-email")
const ObjectId = mongoose.Schema.Types.ObjectId

const AuthorSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	title: {
		type: String, required: true,
		enum: ["Mr", "Mrs", "Miss"]
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		unique: true,
		required : true
	},
	password: { type: String, required: true }

})

module.exports = mongoose.model('Author', AuthorSchema)




