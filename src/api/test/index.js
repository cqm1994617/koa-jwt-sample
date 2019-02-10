const jwt = require('jsonwebtoken')

async function test(ctx) {

  const token = ctx.request.header['x-authorization']

  try {
    const decoded = jwt.verify(token, 'myKey')
    console.log(decoded)
  } catch (e) {
    console.log(e)
  }

  ctx.body = {
    data: 'test'
  }
}

module.exports = {
  test
}
