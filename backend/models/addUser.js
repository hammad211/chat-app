var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const userSchema =  mongoose.Schema({
	
	name: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
	},
	tutor_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },  
});

const Add = mongoose.model('Add', userSchema);
module.exports = Add;
