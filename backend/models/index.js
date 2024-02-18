var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const UserSchema =  mongoose.Schema({
	email: {
		type: String,
	},
	name: {
		type: String,
	},
	password: {
		type: String,
	},
	
});
UserSchema.virtual('addUser',{
	ref:'addUser',
	localField:'_id',
	foreignField:'user_id'
  })

UserSchema.methods.generateHashedPassword = async function () {
	let salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
  };
  const User = mongoose.model('User', UserSchema);

module.exports = User;
