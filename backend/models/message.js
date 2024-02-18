var mongoose = require("mongoose");
const messageSchema =  mongoose.Schema({
	message: {
		type: String,
	},
	// date: {
	// 	type: Date,
	// 	default: Date.now,
	// },
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
