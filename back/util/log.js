
const { name } = require('../package.json');
const bProd = process.env.NODE_ENV || "development";

const log4js = require('log4js');
bProd && log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/app.log', category: name, maxLogSize: 204800 }
  ]
});
let log = log4js.getLogger(name);
//log.setLevel(bProd ? 'DEBUG' : 'ERROR');

module.exports = log;
