import Vue from 'vue'
import VueRouter from 'vue-router'
//import VueMeta from 'vue-meta'
Vue.use(VueRouter)
//Vue.use(VueMeta)

// base pages
import Page404 from '../pages/404.vue'
// import PageHome from '../pages/home.vue'
import PageLogin from '../pages/login.vue'
import PageLogout from '../pages/logout.vue'

//import ViewUsers from '../views/users.vue'
//import ViewUser from '../views/user.vue'
//import EditUser from '../views/edit_user.vue'

//import ViewTopic from '../views/topic.vue'
//import EditTopic from '../views/edit_topic.vue'
//import ViewTopics from '../views/topics.vue'

import ViewTags from '../views/tags.vue'
import ViewTag from '../views/tag.vue'
import ViewCategories from '../views/categories.vue'
import ViewCategory from '../views/category.vue'

const ViewUser = process.BROWSER
  ? () => System.import('../views/user.vue')
  : require('../views/user.vue')
const EditUser = process.BROWSER
  ? () => System.import('../views/edit_user.vue')
  : require('../views/edit_user.vue')

const ViewTopics = process.BROWSER
  ? () => System.import('../views/topics.vue')
  : require('../views/topics.vue')
const ViewTopic = process.BROWSER
  ? () => System.import('../views/topic.vue')
  : require('../views/topic.vue')
const EditTopic = process.BROWSER
  ? () => System.import('../views/edit_topic.vue')
  : require('../views/edit_topic.vue')

// const ViewGroups = process.BROWSER
//   ? () => System.import('../views/groups.vue')
//   : require('../views/groups.vue')
// const ViewGroup = process.BROWSER
//   ? () => System.import('../views/group.vue')
//   : require('../views/group.vue')
// const EditGroup = process.BROWSER
//   ? () => System.import('../views/edit_group.vue')
//   : require('../views/group.vue')

export default new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, saved) => {
    if (saved) return saved
    return to.hash ? { selector: to.hash } : { x: 0, y: 0 }
  },
  routes: [
    { path: '/', name: 'view-home-topics', component: ViewTopics },
    { path: '/login', name: 'page-login', component: PageLogin },
    { path: '/logout', name: 'page-logout', component: PageLogout },

    //{ path: '/user', name: 'view-users', component: ViewUsers },
    { path: '/user/:username', name: 'view-user', component: ViewUser },
    { path: '/edit/user/:username', name: 'edit-user', component: EditUser }, // only self

    { path: '/create/topic', name: 'create-topic', component: EditTopic },
    { path: '/edit/topic/:path', name: 'edit-topic', component: EditTopic },
    { path: '/topic', name: 'view-topics', component: ViewTopics },
    { path: '/topic/:path', name: 'view-topic', component: ViewTopic },
    { path: '/tag', name: 'view-tags', component: ViewTags },
    { path: '/tag/:path', name: 'view-tag', component: ViewTag },
    //{ path: '/group', name: 'view-groups', component: ViewGroups },
    //{ path: '/group/:path', name: 'view-tag', component: ViewGroup },
    
    //{ path: '/uploader', name: 'uploader', component: require('../pages/upload.vue') },


    { path: '/404', name: 'page-404', component: Page404 },
    { path: '*', name: 'page-redirect-404', component: Page404 },
  ]
})