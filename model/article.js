const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
moment.locale('zh-cn')

const articleSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	content:String,
	user:{type:Schema.Types.ObjectId,ref:'user'},
	comments:[
		{
			content:String,
			time:{
				type: Date,
				default: Date.now()
			},
			from:{type:Schema.Types.ObjectId,ref:'user'},
			to:{type:Schema.Types.ObjectId,ref:'user'},
		}
	],
	createTime:{
		type: Date,
	},
	lastEditTime: {
        type: Date,
        default: Date.now,
    },
})

articleSchema.set('toJSON', { getters: true, virtuals: true });

articleSchema.set('toObject', { getters: true, virtuals: true });

articleSchema.path('createTime').get(function (v) {

    return moment(v).format('lll');

})
articleSchema.path('lastEditTime').get(function (v) {

    return moment(v).format('lll');

})

module.exports = mongoose.model('article', articleSchema);