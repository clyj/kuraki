const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')

const router = require('./routes/index')
const config = require('./configs/index')
const jwt = require('koa-jwt')
const tokenverify = require('./middleware/token_verify');

mongoose.Promise = global.Promise

mongoose.connect(config.mongodb.url, config.mongodbSecret)
mongoose.connection.on('err',console.error.bind(console, '数据库连接错误'))

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(tokenverify())

app.use(jwt({
	secret:config.jwt.secret
}).unless({
	path:[/^\/user/]
}))

// ejs
app.use(views(__dirname + '/views', {
	map : {html:'ejs'}
}))



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(router.routes()).use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
