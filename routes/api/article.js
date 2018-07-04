const router = require('koa-router')()
const ArticleController = require('../../controllers/article_controller')
// router.post('/ss',async (ctx,next) =>{
// 	ctx.body={
// 		message:'成功',
		
// 	}
// })	

router.post('/createArticle',ArticleController.createArticle)

router.get('/findArticle',ArticleController.findArticle)

router.get('/listArticle',ArticleController.listArticle)

module.exports = router
