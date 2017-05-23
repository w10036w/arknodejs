const { fmtDate } = resolve('util/date')

module.exports = {
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false }
}
