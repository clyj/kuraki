const jwt = require('jsonwebtoken')
const UserModel = require('../model/user')
const config = require('../configs/index')
const bcrypt = require('bcryptjs')

class UserController{
	async login(ctx,next){
		try {
			const {body} = ctx.request
			let user = await UserModel.find({username:body.username})
			if (!user.length) {
				ctx.status = 400
				ctx.body={
					err:'用户名不存在'
				}
				return
			}
			if (await bcrypt.compare(body.password,user[0].password)) {
				const token =  jwt.sign({
					data:{
						uid:user[0]._id,
						name:user[0].username,
					},
					exp:Math.floor(Date.now()/1000)+24*60*60 //1 hours
				},config.jwt.secret)
				ctx.status = 200
				ctx.body={
					message:'登入成功',
					token 
				}
			} else {
				ctx.status = 400
				ctx.body={
					message:'密码错误'
				}
			}
		} catch(e) {
			console.log(e);
		}
	}

	async signup(ctx,next){
		try {
			const {body} = ctx.request
			if (!body.password || !body.username) {
				ctx.status = 400
				ctx.body = {
					error:'存在空字段'
				}
				return
			}

			let user = await UserModel.find({username:body.username})
			body.password = await bcrypt.hash(body.password,8)
			console.log(body.password)
			if (!user.length) {
				const signUser = new UserModel({
					username:body.username,
					password:body.password,
					avatar:'',
					createTime:new Date()
				})

				await signUser.save().catch(err=>{
					console.log(err)
				})

				ctx.status = 200
				ctx.body = {
					message:'注册成功'
				}
			} else {
				ctx.status = 400
				ctx.body = {
					err:'用户名存在'
				}
			}
		} catch(e) {
			// statements
			console.log(e);
		}
	}
}

module.exports = new UserController()