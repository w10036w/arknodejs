<template>
<div id="app">
	<nav-bar></nav-bar>
	<transition name="fade" mode="out-in">
		<router-view></router-view>
	</transition>
	<foot-bar></foot-bar>
	<w-dialog></w-dialog>
</div>
</template>
<script>
import NavBar from './components/widget/NavBar.vue'
import FootBar from './components/widget/Footer.vue'
import WDialog from './components/widget/Dialog.vue'
import axios from 'axios'
export default {
	name: 'app',
	components: { NavBar, FootBar, WDialog },
	beforeMount () {
		let token = window.localStorage.token
		if (!token) return
		axios.interceptors.request.use(config => {
			if (axios.method === 'get') return config
			config.headers['authorization'] = token
			return config
		}, (error) => Promise.reject(error))

		axios.get('/api/verify_token').then(resp => {
			if (resp.data.code>200) return
			this.$store.dispatch('login', resp.data.data)
			return resp.data.data
		}).then(data => {
			// ROUTE: edit authorization
			//return this.$store.dispatch('fetch_messages', data._id)

		})
	}
}

</script>
<style lang="stylus">
@import entry
#app
	font-family Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
</style>
