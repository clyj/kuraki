const router = require('koa-router')()
const UserController = require('../controllers/user_controller')
const schedule = require("node-schedule")

router.post('/login',UserController.login)

router.post('/signup',UserController.signup)

// router.post('/ss',async (ctx,next) =>{
// 	let c = 1
// 	await schedule.scheduleJob('5 * * * * *', function(){  
		
// 	  console.log(`now${c}:${new Date()}`)

// 	  if (c==3) {
// 	  	console.log('over')
// 	  	this.cancel()
// 	  }
// 	  c++
// 	})
// 	ctx.status = 200
// 	ctx.body={
// 		message:'成功',
		
// 	}
// })

module.exports = router
