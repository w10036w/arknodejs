const qn = require('./qn')
const { bSigned } = resolve('middleware/auth')
module.exports = r => {
  r.post('/cdn/token', bSigned, qn.getToken)
}