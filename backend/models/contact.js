var mongoose = require("mongoose");
const ContactSchema =  mongoose.Schema({
	
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	subject: {
		type: String,
	},
	message: {
		type: String,
	}
});
const contact = mongoose.model('contact', ContactSchema);
module.exports = contact;
