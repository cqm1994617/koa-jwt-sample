const query = require('../../db/index').query
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const jwtKey = require('../key')

async function register(ctx) {

  const username = ctx.request.body.username || ''
  const password = ctx.request.body.password || ''

  if (!(/^[a-zA-Z0-9_-]{4,16}$/).test(username)) {
    return ctx.body = {
      code: 0,
      data: {
        code: 1,
        err: '账号长度在4-16位之间'
      }
    }
  }
  if (!(/^[a-zA-Z0-9_-]{4,16}$/).test(username)) {
    return ctx.body = {
      code: 0,
      data: {
        code: 1,
        err: '密码长度在4-16位之间'
      }
    }
  }

  const pwdHash = md5(password)
  const salt = md5(pwdHash.slice(0, 6))

  try {
    const data = await query({
      sql: 'select * from user where user_name = ?',
      values: [username]
    })
    if (data.results.length > 0) {
      return ctx.body = {
        code: 1,
        err: '已注册，请更换账号'
      }
    }
    
    await query({
      sql: 'insert into user (user_name, password_hash, salt) values (?, ?, ?)',
      values: [username, md5(pwdHash + salt), salt]
    })

    ctx.body = {
      code: 0,
      data: {
        token: jwt.sign({
          username
        }, jwtKey, { expiresIn: 60 * 60 })
      }
    }

  } catch (e) {
    console.log(e)

  }
}

module.exports = {
  register
}
