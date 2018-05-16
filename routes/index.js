const router = require('koa-router')()
const home = require('./home')
const user = require('./users')
const api = require('./api/index')

//home
router.use('/',home.routes(),home.allowedMethods())
//user
router.use('/user',user.routes(),user.allowedMethods())
//api
router.use('/api',api.routes(), api.allowedMethods())

module.exports = router
