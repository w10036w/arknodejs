/// before Node 7.6.0, depreciated
require('babel-register')({
  plugins: ['transform-async-to-generator']
});

require('./app.js');
