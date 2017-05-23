<template>
<div class="view view-edit-user">
	<div class="wide-screen">
		<aside class="block right">
			<nav class="navigator pad-lr-10">Operations</nav>
			<div class="btn-group flex around_center">
				<span class="btn btn-blue" @click="update">UPDATE</span>
			</div>
		</aside>
		<div class="profile block main pad-10">
			Bio: <br>
			<textarea v-model="bio"></textarea></p>
		</div>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

function preFetch (store) {

}
export default {
	data: () => ({
		displayName: '',
		bio: ''
	}),
	computed: {
		...mapGetters(['user_curr', 'login_user'])
	},
	methods: {
		update () {
			let id = this.user_curr._id
			let body = {
				bio: this.bio
			}
			this.$store.dispatch('update_user', { id, body }).then(res => {
				if (res.code>200) return// fail 
				else this.$store.dispatch('update_token')
			})
		},
		
	},
	beforeMount () {
		if (!this.$route.params.username) 
			this.$router.push('/404')

		this.$store.dispatch('fetch_user', this.$route.params.username).then(res => {
			if (res.code>200 || !res.data._id ) {
				//this.$router.push('/404')
				console.log(res)
			}
			this.bio = this.user_curr.bio
		})
		
	}

}
</script>
<style lang="stylus">
@import '~styl_var'
.view-edit-user
	.profile
		textarea
			width 100%
			height 300px
	aside
		nav
			line-height 40px
		.btn-group
			height 50px
			.btn
				padding 5px 12px 
</style>