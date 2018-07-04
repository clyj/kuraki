const jwt = require('jsonwebtoken')
const util = require('util')
const config = require('../configs/index')
const verify = util.promisify(jwt.verify)

module.exports = ()=>{
	return async (ctx,next)=>{
		try {
			const token = ctx.header.authorization
			if(token){
				console.log(token)
				try {
				let payload = await verify(token.split(' ')[1],config.jwt.secret)
        		// console.log(payload.data)
        		ctx.request.body.user = payload.data
        		} catch(e) {
					// if ('TokenExpiredError' === err.name) {
			  //           ctx.throw(401, 'token expired,请及时本地保存数据！');
			  //       }
			        ctx.throw(401, 'invalid token');
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
				e.status=404
				ctx.body = {
		          success: 0,
		          message: '404'
		        }
		    }

		}
	}
}