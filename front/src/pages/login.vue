<template>
<div class="page page-login">
	<div class="info block" v-if="msg">
		{{ msg }}
	</div>
	<div class="vendors block">
		<p>
			<span class="btn" @click="login('github')">
				<i class="fa fa-github"></i> Login with Github
			</span>
		</p>
		<p>
			<span class="btn" @click="login('twitter')">
				<i class="fa fa-twitter"></i> Login with Twitter
			</span>
		</p>
		<!--<p>
			<span class="btn" @click="login('facebook')">
				<i class="fa fa-facebook"></i> Login with Facebook
			</span>
		</p>
		<p>
			<span class="btn" @click="login('google')">
				<i class="fa fa-google"></i> Login with Google
			</span>
		</p>-->
	</div>
</div>
</template>
<script>
import { popupCenter } from '../utils/dom'
export default {
	name: 'page-login',
	data: () => ({
		msg: ''
	}),
	methods: {
		login (vendor) {
			let w = 600, h = 400
			let uri = `https://${location.host}/api/auth/${vendor}`
			popupCenter(uri, w, h)
		}
	},
	mounted () {
		if (this.$route.query.redirect) {
			window.sessionStorage.redirect = this.$route.query.redirect
		}
		this.msg = window.sessionStorage.info
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
.page-login
	padding-top 20px
	.info
		margin 0 auto
		width 400px
		line-height 40px
		padding 10px
		margin-bottom 10px
		color c-ios-red
		text-align center
	.vendors
		margin 0 auto
		width 400px
		padding 10px
		p
			text-align center
			height 40px
			line-height 40px
			.btn
				width 250px
				&:hover, &:active
					background-color c-bg
			i
				width 32px
				font-size 2em
				vertical-align middle
			.fa-github
				color c-ios-purple
			.fa-twitter
				color c-ios-tealBlue
			.fa-facebook
				color c-ios-blue
			.fa-google
				color c-ios-red
</style>
