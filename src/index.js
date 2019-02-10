const Koa = require('koa')
const router = require('./router').router
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')

const app = new Koa()

app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 1,
        err: 'token失效或header中Authorization异常'
      }
    } else {
      throw err;
    }
  })
})

app.use(jwt({ 
  secret: 'myKey',
}).unless({
  path: [/\/register/, /\/login/]
}))

app.use(bodyparser())

app.use(router.routes())

app.listen(8088, () => {
  console.log('start at 8088')
})
