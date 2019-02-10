const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool(config)

function query(...args) {
  return new Promise((resolve, rejected) => {
    
    pool.query(...args, function(err, results, fields) {
      resolve({
        err,
        results,
        fields
      })
    })
  })
}

module.exports = {
  query
}
