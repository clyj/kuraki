const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:String,
	createTime:{
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('user', userSchema);