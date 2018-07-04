const router = require('koa-router')()
const article = require('./article')
const upload = require('./upload')

//article
router.use('/article',article.routes(),article.allowedMethods())
//upload
router.use('/upload',upload.routes(),upload.allowedMethods())

module.exports = router