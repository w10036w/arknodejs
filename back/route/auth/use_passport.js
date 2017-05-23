const session = require('koa-session')
const passport = require('koa-passport')
const mongoose = require('mongoose')

const { twitter, github, facebook } = resolve('config')
//const cache = resolve('cache')
const { filterAttr } = resolve('util/ext')
const User = resolve('db').models.user

const { login, login_local } = require('./actions')

const select = '_id username displayName avatar role provider level group hidden createAt'
const pauth = passport.authenticate.bind(passport)

function add_local (passport, r) {
  const LocalStrategy = require('passport-local').Strategy
  passport.use(new LocalStrategy({
    session: false
  },
    async (username, password, done) => {
      const criteria = { username }
      let localSelect = select + ' hashed_password salt'
      const opts = { criteria, select: localSelect }
      let user = await User.load(opts)
      if (!user || !user.authenticate(password)) {
        return done(null, false)
      }
      user = filterAttr(user, select)
      return done(null, user)
    }
  ))
  r.post('/auth/local', (ctx, next) => {
    return pauth('local', user => {
      login_local(ctx, user)
    })(ctx, next)
  })
}

function add_twitter (passport, r) {
  const TwitterStrategy = require('passport-twitter').Strategy
  passport.use(new TwitterStrategy({
      consumerKey: twitter.consumerKey,
      consumerSecret: twitter.consumerSecret,
      callbackURL: twitter.callbackURL,
      userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    },
    async function(token, tokenSecret, profile, done) {
      const criteria = { twitterId: '' + profile.id }
      const opts = { criteria, select };
      let user = await User.load(opts)
      log.debug('user', user)
      if (user) return done(null, user)
      else {
        let userObj = {
          _id : mongoose.Types.ObjectId(),
          username: profile.username,
          displayName: profile.displayName || profile.username,
          provider: 'twitter',
          email: profile.emails && profile.emails[0].value || '',
          avatar: profile.photos[0].value,
          role: 'guest',
          level: 1,
          group: [],
          twitterId: profile.id,
          authToken: token
        }
        user = new User(userObj)
        try { await user.save() }
        catch (err) { return done(null, false) }
        userObj = filterAttr(userObj, select)
        return done(null, userObj)
      }
    }
  ))

  r.get('/auth/twitter', pauth('twitter', { session: false }))
  r.get('/auth/twitter/callback', (ctx, next) => {
    return pauth('twitter', (user, err ) => {
      return login(ctx, user, err || 'Twitter authentication failed. Try again later.')
    })(ctx, next)
  })
}

function add_github (passport, r) {
  const GithubStrategy = require('passport-github').Strategy
  passport.use(new GithubStrategy({
      clientID: github.clientID,
      clientSecret: github.clientSecret,
      callbackURL: github.callbackURL
    },
    async function(token, tokenSecret, profile, done) {
      try {
        const criteria = { githubId: profile.id }
        const opts = { criteria, select };
        let user = await User.load(opts)
        if (user) return done(null, user)
        else {
          let userObj = {
            _id : mongoose.Types.ObjectId(),
            username: profile.username,
            displayName: profile.displayName || profile.username,
            provider: 'github',
            email: profile.emails && profile.emails[0].value || '',
            avatar: profile.photos[0].value,
            githubAddr: profile._json.html_url,
            githubId: profile.id,
            authToken: token,
            bio: profile._json.bio,
            role: 'guest',
            level: 1,
            group: []
          }
          user = new User(userObj)
          try { await user.save() }
          catch (err) { return done(null, false) }
          userObj = filterAttr(userObj, select)
          return done(null, userObj)
        }
      } catch (err) { console.log(err) }
    }
  ))

  r.get('/auth/github', pauth('github', { session: false }))
  r.get('/auth/github/callback', (ctx, next) => {
    return pauth('github', user => {
      return login(ctx, user, 'Github authentication failed. Try again later.')
    })(ctx, next)
  })
}

function add_facebook (passport, r) {
const FacebookStrategy = require('passport-facebook').Strategy
  passport.use(new FacebookStrategy({
      clientID: facebook.clientID,
      clientSecret: facebook.clientSecret,
      callbackURL: facebook.callbackURL
    },
    async function(token, tokenSecret, profile, done) {
      try {
        const criteria = { facebookId: profile.id }
        const opts = { criteria, select };
        let user = await User.load(opts)
        if (user) return done(null, user)
        else {
          let userObj = {
            _id : mongoose.Types.ObjectId(),
            username: profile.username,
            displayName: profile.displayName || profile.username,
            provider: 'facebook',
            email: profile.emails && profile.emails[0].value || '',
            avatar: profile.photos[0].value,
            facebookId: profile.id,
            authToken: token,
            bio: profile._json.bio,
            role: 'guest',
            level: 1,
            group: []
          }
          user = new User(userObj)
          try { await user.save() }
          catch (err) { return done(null, false) }
          userObj = filterAttr(userObj, select)
          return done(null, userObj)
        }
      } catch (err) { console.log(err) }
    }
  ))
  
  r.get('/auth/facebook', pauth('facebook', { 
    scope: ['email', 'user_location'], 
    session: false 
  }))
  r.get('/auth/facebook/callback', (ctx, next) => {
    return pauth('facebook', user => {
      return login(ctx, user, 'Facebook authentication failed. Try again later.')
    })(ctx, next)
  })
}

module.exports = (app, r, providers) => {
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser(async (_id, done) => {
    done(null, await User.load({ criteria: { _id } }))
  })

  providers.includes('local') && add_local(passport, r)
  providers.includes('twitter') && add_twitter(passport, r)
  providers.includes('github') && add_github(passport, r)


  app.use(session({}, app))
  app.use(passport.initialize())
  app.use(passport.session())


  return passport
}
