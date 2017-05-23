const { graphql,
        GraphQLInt,
        GraphQLString,
        GraphQLFloat,
        GraphQLBoolean,
        GraphQLList,
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLSchema } = require('graphql')

const log = resolve('util/log')
const { rJson } = resolve('util/ext')
const { bPermitted } = resolve('util/token')
const { bAdmin } = resolve('middleware/auth')

const User = resolve('db').models.user;

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    level: { type: GraphQLInt },
    role: { type: GraphQLString },
    avatar: { type: GraphQLString },
    hidden: { type: GraphQLBoolean } // set permission to test
  }
});

const respType = new GraphQLObjectType({
  name: 'Resp',
  fields: {
    code: { type: GraphQLInt },
    note: { type: GraphQLString },
    time: { type: GraphQLInt }
  }
})
const userQuery = {
  /** user query sample:
   {
     user(username:"dev_mozat") {
       displayName, username, role, avatar
     }
   }*/
  user: {
    type: userType,
    args: {
      username: {
        name: 'username',
        type: GraphQLString
      }
    },
    resolve: (root, { username }, ctx, fieldASTs) => {
      //console.log(root) // undefined
      // console.log(fieldASTs)
      // TODO: add authorization check here
      if (bAdmin)
      return User.findOne({ username })
    }
  },
  /** users query sample:
  {
    users(provider:"twitter") {
      displayName,
        username
    }
  }*/
  users: {
    type: new GraphQLList(userType),
    args: {
      role: {
        name: 'role',
        type: GraphQLString
      },
      provider: {
        name: 'provider',
        type: GraphQLString
      }
    },
    resolve (user, opts, ctx) {
      return User.find(opts)
    }
  }
};

const userMutation = {
  /** create user example
  mutation {
    createUser(username:"admin",displayName:"administrator",password:"admin",
               avatar:"https://pic4.zhimg.com/bd21f286e6aa5e210b60e2e257ce890b_l.jpeg") {
      level
    }
  }*/
  create: {
    type: respType,
    args: {
      username: {
        name: 'username',
        type: new GraphQLNonNull(GraphQLString)
      },
      displayName: { name: 'displayName', type: GraphQLString },
      password: { name: 'password', type: GraphQLString },
      avatar: { name: 'avatar', type: GraphQLString },
      email: { name: 'email', type: GraphQLString },
      provider: { name: 'provider', type: GraphQLString },
      role: { name: 'role', type: GraphQLString },
      level: { name: 'level', type: GraphQLInt },
      group: {
        name: 'group',
        type: new GraphQLList(GraphQLString)
      },
    },
    resolve (root, opts, ctx) {
      let permit = bPermitted(ctx.headers.Authorization)
      console.log('permitted ?', permit)
      if (permit) {
        return User.findOne({ username: opts.username }, async (err, d) => {
          if (err) log.error(err)
          if(!d) {
            await new User(opts).save();
            return rJson(200, 'user created')
          } else {
            return rJson(200, 'user exists')
          }
        })
      } else {
        return rJson(401, 'admin required')
      }
    }
  }
}

const query = new GraphQLObjectType({
  name: 'query',
  fields: {
    user: userQuery.user,
    users: userQuery.users,
  }
})
const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createUser: userMutation.create
  }
})

const schema = new GraphQLSchema({ query, mutation });

module.exports = {
  schema
}
