import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

// import 'element-ui/lib/theme-default/index.css'
// import { Upload, Button } from 'element-ui'
// Vue.use(Upload)
// Vue.use(Button)

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = {
  router,
  store,
  ...App
}

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }

router.beforeEach((to, from, next) => {
  const matched_rules = to.matched.find(record => record.meta.auth)
  if (matched_rules) {
    // this route requires authority, check if logged in and role matches
    // if not, redirect to login page.
    const required = matched_rules.meta.auth
    const login_user = store.state.login_user
    if (required==='guest') {
      if (!login_user._id)
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      else next()
    } else if (required==='editor') {
      if (login_user._id && login_user.role==='editor')
        next()
      else 
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
    }
    
  } else {
    next() // 确保一定要调用 next()
  }
})