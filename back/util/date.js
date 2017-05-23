var moment = require('moment');
moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, fromNow=true) {
  date = moment(date);
  return fromNow ? date.fromNow() : date.format('YYYY-MM-DD HH:mm')
};

