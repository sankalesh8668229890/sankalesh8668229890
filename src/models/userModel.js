const mongoose = require('mongoose')
const ObjectId= mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema( {
	 firstname: {type:String,required:true },
	 lastname: {type:String,required:true},
	  title: {type:String,required:true, 
		enum: [Mr, Mrs, Miss]}, 
		email: {type:String, 
			unique:true}, 
			password: {type:password,required:true} 
    
})

module.exports = mongoose.model('UUSER', userSchema) 




