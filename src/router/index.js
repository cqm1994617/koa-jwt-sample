const Router = require('koa-router')
const login = require('../api/login').login
const register = require('../api/register').register
const test = require('../api/test').test

const router = new Router({
  prefix: '/user-center'
})

router.post('/login', login)
router.post('/register', register)
router.get('/test', test)

module.exports = {
  router
}
