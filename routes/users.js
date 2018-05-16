const router = require('koa-router')()
const UserController = require('../controllers/user_controller')

router.post('/login',UserController.login)

router.post('/signup',UserController.signup)

module.exports = router
