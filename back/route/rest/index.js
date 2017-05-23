// Do access control in router level via middleware
const { models, actions } = resolve('db')
const { bSigned, bEditor, bAdmin } = resolve('middleware/auth');

const user_api = require('./v1/user')
const topic_api = require('./v1/topic')
const reply_api = require('./v1/reply')
const message_api = require('./v1/message')
const tag_api = require('./v1/tag')
const category_api = require('./v1/category')
const group_api = require('./v1/group')

// public
function community_api (r) {
  // user
  r.get('/user/:username', user_api.findByUsername) // x
  r.get('/user', user_api.findByIds)
  r.get('/user/is_following/:userId', bSigned, user_api.isFollowing) // x
  r.get('/user/is_favorited/:topicId', bSigned, user_api.isFavorited)
  r.patch('/user/:id', bSigned, user_api.updateById) // x
  r.patch('/user/following/:userId', bSigned, user_api.followUser)
  r.patch('/user/favorite/:topicId', bSigned, user_api.favoriteTopic)
  r.patch('/user/group/:groupId', bSigned, user_api.joinGroup)
  //r.del('/user/:id', bEditor, user_api.hide_by_editor)

  // topic
  r.get('/topic/:path', topic_api.findByPath)
  r.get('/topic', topic_api.find)
  r.post('/topic', bSigned, topic_api.create) // x
  r.post('/topic_by_editor', bEditor, topic_api.create_by_editor) // x
  r.patch('/topic/:id', bSigned, topic_api.updateById)
  r.patch('/topic_by_editor/:id', bEditor, topic_api.updateById_by_editor)
  //r.del('/topic/:id', bEditor, topic_api.hide_editor)


  // reply
  r.get('/reply', reply_api.findByTopicAuthor)
  r.post('/reply', bSigned, reply_api.create)
  r.patch('/reply/:id', bSigned, reply_api.updateById)
  //r.del('/reply/:id', bEditor, reply_api.hide_editor)

  // message
  r.get('/message/:receiverId', message_api.find)
  r.patch('/message/:id', message_api.updateById) // read=1 means viewed

  // tag
  r.get('/tag', tag_api.find) // x
  r.get('/tag/:path', tag_api.findByPath) // x
  r.post('/tag', bEditor, tag_api.create) // x
  r.patch('/tag/:id', bEditor, tag_api.updateById) // x

  // category
  r.get('/category', category_api.find) // x
  r.get('/category/:path', category_api.findByPath) // x
  r.post('/category', bEditor, category_api.create) // x
  r.patch('/category/:id', bEditor, category_api.updateById) // x

  // group
  r.get('/group', group_api.find) // x
  r.get('/group/:path', group_api.findByPath) // x
  r.post('/group', bEditor, group_api.create) // x
  r.patch('/group/:id', bEditor, group_api.updateById) // x

  // TODO explore subscribe func
}

// admin controls all mutations
function admin_api (r) {
  let keys = Object.keys(models)
  let i = keys.length
  let model, name, action;
  while (i--) {
    model = models[keys[i]]
    name = model.modelName
    action = actions(model)

    r.get(`/admin/${name}s`, bAdmin, action.find)
    r.get(`/admin/${name}`, bAdmin, action.findOne)
    r.get(`/admin/${name}/:id`, bAdmin, action.findById)

    r.post(`/admin/${name}`, bAdmin, action.create)
    r.del(`/admin/${name}/:id`, bAdmin, action.removeById)
    r.del(`/admin/${name}s`, bAdmin, action.remove)
    r.patch(`/admin/${name}/:id`, bAdmin, action.updateById)
  }
}

module.exports = r => {
  community_api(r)
  admin_api(r)
};
