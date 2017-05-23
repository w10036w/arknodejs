<template>
<nav class="nav-bar">
	<div class="wide-screen row">
		<router-link to="/">
			<div class="left logo flex between_center">
				<img height="40"
						 src="/favicon/apple-icon-57x57.png">
				<span>ArkNodeJs</span>
			</div>
		</router-link>
		<div class="nav-guest right" v-if="login_user._id">
			<div class="btn nav-btn-box">
				<router-link :to="{ name: 'create-topic' }">
					<i class="fa fa-file"></i>
				</router-link>
			</div>
			<div class="btn nav-btn-box">
				<span @click="toggleNoticeList">
					<i class="fa fa-bell"></i>
				</span>
			</div>
			<transition name="slide-top">
				<ul class="nav-toggle-list nav-toggle-list-message rad-4 center" v-show="show_notice_list">
					<li v-for="e in message_list">
						
					</li>
				</ul>
			</transition>
			
			<div class="btn nav-btn-box" @click="toggleUserList">
				<span>{{ login_user.displayName }} <i class="fa trans_200" 
					:class="show_user_list?'fa-caret-up':'fa-caret-down'"></i>
				</span>
			</div>
			<transition name="slide-top">
				<ul class="nav-toggle-list rad-4 center" v-show="show_user_list">
					<li>
						<router-link :to="'/user/'+login_user.username">Profile</router-link>
					</li>
					<li>
						<router-link to="/setting/">Setting</router-link>
					</li>
					<li>
						<router-link to="/logout/">Logout</router-link>
					</li>
				</ul>
			</transition>
		</div>
		<div class="nav-visitor right" v-else>
			<div class="btn nav-btn-box" >
				<router-link to="/login">Login</router-link>
			</div>
		</div>
	</div>
</nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'nav-bar',
	data: () => ({
		show_user_list: false,
		show_notice_list: false
	}),
	computed: {
		...mapGetters([
			'login_user', 'message_list'
		])
	},
	watch: {
		'$route.path' () {
			this.show_user_list = false
		}
	},
	methods: {
		toggleUserList () {
			this.show_user_list = !this.show_user_list
		},
		toggleNoticeList () {
			this.show_notice_list = !this.show_notice_list
		},
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
.nav-bar
	left 0
	width 100%
	height h-nav
	line-height h-nav
	color white
	background-color c-github-dark
	.logo
		width 180px
		height 100%
		img
			border-radius 8px
		span
			text-decoration none!important
			font-size 24px
			text-space 1.2
	.wide-screen
		position relative
		height 100%
	.nav-block-box
		height 100%
	.nav-btn-box
		height 100%
		padding-left 16px
		padding-right 16px
		&:active, &:hover
			background-color rgba(white, .2)
		.fa-bell, .fa-file
			font-size 1.3em
			vertical-align middle
	.nav-guest
		position relative
	.nav-toggle-list
		position absolute
		transition all .2s
		border 1px solid rgba(27,31,35,0.15)
		box-shadow: 0 3px 12px rgba(27,31,35,0.15)
		//top h-nav - 10px
		background-color c-github-dark
		margin-top 5px
		right 0
		z-index z-nav-list
		font-size .9em
		list-style none
		padding 5px 0
		min-width 100px
		line-height 25px
		overflow hidden
		li:hover
			background-color rgba(white, .2)
	.nav-toggle-list-message
		min-height 150px
	.title
		position absolute
		width 100%
		height 100%
		text-align center
		padding 0 h-nav
		z-index -1
	.search-bar
		position absolute
		width 100%
		height 100%
		z-index -1
		padding-left h-nav
		input
			width 97%
			height 35px
			line-height 20px
			background-color #eaebed
			border 1px solid c-border
			color #4a4a4a
			padding-left 5px
			font-size 16px
			border-radius 5px
			vertical-align middle
	&.bg-white
		background-color white!important
</style>
