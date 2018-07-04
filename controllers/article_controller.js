const ArticleModel = require('../model/article')


class ArticleController{

	async createArticle (ctx,next) {
		const title = ctx.request.body.title
		const content = ctx.request.body.content
		const user = ctx.request.body.user.uid
		const createTime = new Date();
    	const lastEditTime = new Date();
    	if (title === '') {
        	ctx.throw(400, '标题不能为空');
	    }
	    if (content === '') {
	        ctx.throw(400, '文章内容不能为空');
	    }
	    const article = new ArticleModel({
	    	title,
	    	content,
	    	user,
	    	createTime,
	    	lastEditTime
	    })
	    let createResult = await article.save().catch(err => {
	     	ctx.throw(500, '服务器内部错误');
	   	})

	   	ctx.body = {
	        success: true,
	        article: createResult,
	    }
	}


	async findArticle (ctx,next) {
		// let data = ''
		// console.log(ctx.request.query.id)
		let articleId = ctx.request.query.id
		let data = await ArticleModel.findById(articleId).populate('user').exec()

		ctx.body = {
			success:true,
			data:data
		}
	}


	async listArticle(ctx,next) {
		let data = await ArticleModel.find({},{title:1,user:1,lastEditTime:1})
		.populate('user','username').sort({ lastEditTime: -1 }).exec()

		ctx.body = {
			success:true,
			data:data
		}
	}
}

module.exports = new ArticleController()