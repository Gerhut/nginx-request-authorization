const Koa = require('koa')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const send = require('koa-send')

const app = module.exports = new Koa()

app.use(logger())

app.use((context, next) => {
  context.assert(context.path === '/', 404)
  return next()
})

app.use(bodyparser())

app.use((context, next) => {
  if (context.method === 'GET') {
    context.state.username = context.cookies.get('username')
    context.state.password = context.cookies.get('password')
  } else if (context.method === 'POST') {
    context.state.username = context.request.body.username
    context.state.password = context.request.body.password
  } else {
    context.throw(405)
  }

  return next()
})

app.use(async (context, next) => {
  if (context.state.password === process.env.PASSWORD) {
    context.status = 200
    context.set('X-Username', context.state.username)
    return next()
  } else {
    context.status = 401
    return send(context, 'login.html', { root: __dirname })
  }
})

app.use(context => {
  if (context.method === 'POST') {
    context.cookies.set('username', context.state.username)
    context.cookies.set('password', context.state.password)
  }
})

if (require.main === module) {
  app.listen(process.env.PORT)
}
