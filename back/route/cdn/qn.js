const qiniu = require('qiniu')
const { rJson } = resolve('util/ext')

const { qn } = resolve('config')

qiniu.conf.ACCESS_KEY = qn.accessKey;
qiniu.conf.SECRET_KEY = qn.secretKey;

// not processed...
//let fops = 'imageView2/0/q/75|imageslim'
let fops = ''

const policy = (name, fileName) => {
	let encoded = new Buffer(`${qn.bucket}/${fileName}`).toString('base64')
  let persist = {
    persistentOps: `${fops}|saveas/${encoded}`,
  }
	// let persist
	// if (qiniuPipeline !== '') {
	// 	persist = {
	// 		persistentOps: `${fops}|saveas/${encoded}`,
	// 		persistentPipeline: qiniuPipeline
	// 	}
	// } else {
	// 	persist = {}
	// }
	return Object.assign({}, persist, {
		scope: name,
		deadline: new Date().getTime() + 600,
    mimeLimit: 'image/*',
    fsizeLimit: 1048576
		// insertOnly: 1,
	})
}

function getToken (ctx) {
  const { name } = ctx.query
	let key = `${qn.bucket}:${name}`
	let putPolicy = new qiniu.rs.PutPolicy2(policy(key, name));
	let token = putPolicy.token();
	const data = {
		token,
		key: name,
		host: qn.host,
	};
	return ctx.body = rJson(200, data)
}
module.exports = {
  getToken
}