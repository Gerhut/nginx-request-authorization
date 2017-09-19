const Koa = require('koa')
const logger = require('koa-logger')

const app = module.exports = new Koa()

app.use(logger())

app.use(context => {
  const username = context.get('X-Username')
  context.body = `Hello ${username}`
})

if (require.main === module) {
  app.listen(process.env.PORT)
}
