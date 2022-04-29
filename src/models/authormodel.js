const mongoose = require('mongoose')
//require("mongoose-type-email")
const validator = require('validator')
//const ObjectId = mongoose.Schema.Types.ObjectId
const bcrypt = require("bcryptjs")
let authorcontroller = require('../controllers/authorController');

//Schema
const AuthorSchema = new mongoose.Schema({
	firstName: { type: String, required: true,trim :true },
	lastName: { type: String, required: true,trim :true },
	title: {
		type: String, required: true,
		enum: ["Mr", "Mrs", "Miss"]
	},
	email: {
		type: String,
		unique: true,
		required : true,
		validate(value){
			if (!validator.isEmail(value)){
				throw new Error("invalid email");
			}}
	},
	password: { type: String, required: true }

})
	// let save = async function(req,res,next){ 

// AuthorSchema.pre("save",async function(next){
// 	// const passwordHash = await bcrypt.hash(password,10); 
// 	if (this.isModified("password")){
// 		console.log(`before-${this.password}`);
// 		// this.password = await bcrypt.hash(this.password,10)
// 		console.log(`after-${this.password}`);

// 	}
// 	next();
// })


module.exports = mongoose.model('Author', AuthorSchema)




