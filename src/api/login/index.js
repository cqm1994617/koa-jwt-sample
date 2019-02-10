const query = require('../../db/index').query
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const jwtKey = require('../key')

async function login(ctx) {

  const username = ctx.request.body.username || ''
  const password = ctx.request.body.password || ''

  const pwdHash = md5(password)

  try {
    const saltData = await query({
      sql: 'select salt from user where user_name = ?',
      values: [username]
    })

    const salt = saltData.results[0].salt

    const userInfo = await query({
      sql: 'select * from user where user_name = ? and password_hash = ?',
      values: [username, md5(pwdHash + salt)]
    })
    
    if (userInfo.results.length > 0) {
      ctx.body = {
        code: 0,
        data: {
          token: jwt.sign({
            username: userInfo.results[0].user_name
          }, jwtKey, { expiresIn: 60 * 60 })
        }
      }
    } else {
      ctx.body = ctx.body = {
        code: 1,
        err: '未注册'
      }
    }
  } catch (e) {
    console.log(e)
  }

}

module.exports = {
  login
}
