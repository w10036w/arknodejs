const { cacheDb, database, sub } = resolve('package')
const cache = {
  redis: {
    uri: `//127.0.0.1:6379`,
    pass: 12345
  },
}[cacheDb]
const db = {
  mongo: {
    uri: `127.0.0.1:27017/blog`
  }
}[database]
module.exports = {
  secret: 'IUHEF49q83$@%#',
  cache,
  db,
  defaultAdmin: {
    username: 'admin',
    displayName: 'admin',
    password: 'admin',
    email: 'm93001m@gmail.com',
    role: 'admin',
    level: 99,
    avatar: 'https://avatars.githubusercontent.com/u/3350260?v=3'
  },
  expiresIn: 2592000,
  twitter: {
    consumerKey: 'VU9aLRYjtjFWWEt05CiaOJxEA',
    consumerSecret: 'VIppmfg3QCLgnzuGrukI9qHN0mJ3YzoTYsLVGqoj3ete1fNt9P',
    callbackURL: `https://arknodejs.dev${sub}/auth/twitter/callback`
  },
  github: {
    clientID: 'df822e64a3015ba8be4a',
    clientSecret: 'ea754d21043b26a1512d9ae9fe7d4e6c3bd5eca1',
    callbackURL: `https://arknodejs.dev${sub}/auth/github/callback`
  },
  wechat: {
    appID: 'wx5866315561971f5e',
    appSecret: 'fb12236dab43ff25113b84c450ed4328',
    callbackURL: `https://arknodejs.dev${sub}/auth/wechat/callback`
  },
  qn: {
    accessKey: 'KYl6qbnTMM3EqdMn-00pBjG8-C6U3POtK6SSaHLX',
    secretKey: '6NJagznOWGTq1Y3tpkpjkk_stGJJTkbVYLEtztLp',
    host: 'https://om1lnfu9j.qnssl.com/',
    bucket: 'arkblog'
  }
}
