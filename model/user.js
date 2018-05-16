const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
	username:String,
	password:String,
	avatar:String,
	createTime:{
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('user', userSchema);