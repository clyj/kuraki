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
const tokenverify = require('./middleware/token_verify')
const cors = require('koa2-cors')
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

// ejs
app.use(views(__dirname + '/views', {
	map : {html:'ejs'}
}))

// app.use(cors())
app.use(cors({
  origin:"http://127.0.0.1:8080",
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  allowMethods: ['GET', 'POST', 'DELETE','PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials:true,
}))

// logger
app.use(async (ctx, next) => {

  // ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  // ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  // ctx.set('Access-Control-Allow-Credentials', true);
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  if (ctx.method == "OPTIONS") {
    ctx.status = 200
  }

  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(tokenverify())

app.use(jwt({
  secret:config.jwt.secret,
  // passthrough:true
}).unless({
  path:[/^\/user/]
}))


// routes
app.use(router.routes()).use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
