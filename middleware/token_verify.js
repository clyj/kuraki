const jwt = require('jsonwebtoken')
const util = require('util')
const config = require('../configs/index')
const verify = util.promisify(jwt.verify)

module.exports = ()=>{
	return async (ctx,next)=>{
		try {
			const token = ctx.header.authorization
			if(token){
				try {
				let payload = await verify(token.split(' ')[1],config.jwt.secret)
        		console.log(payload.data)
        		} catch(e) {
					console.log('token verify fail: ', err)
				}
			} 
			await next()
		} catch(e) {
			if (e.status === 401) {
		        ctx.status = 401;
		        ctx.body = {
		          success: 0,
		          message: '认证失败'
		        }
		    } else {
		        e.status = 404;
		        ctx.body = {
		          success: 0,
		          message: '404'
		        }
		    }

		}
	}
}
