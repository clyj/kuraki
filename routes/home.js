const router = require('koa-router')()

router.get('/', async ( ctx )=>{

	// await ctx.render('index', {})
	ctx.status = 200
	ctx.body = {
		success:'ok'
	}

})

router.post('/', async ( ctx )=>{

	// await ctx.render('index', {})
	ctx.status = 200
	ctx.body = {
		success:'ok'
	}

})

module.exports = router