<template>
<div class="view view-user">
	<div class="wide-screen">
		<main>
			<div class="profile block main pad-10">
				<div class="avatar">
				<router-link :to="'/user/'+user_curr.username">
					<img :src="user_curr.avatar">
				</router-link>
				</div>
				<div class="btn-group">
					<router-link :to="'/edit/user/'+user_curr.username" v-if="login_user._id===user_curr._id">
						<div class="btn btn-edit">
							<i class="fa fa-pencil"></i>
						</div>
					</router-link>
					<div v-else>
						<div class="btn btn-tealBlue btn-follow" @click="followUser">
							{{ is_following?'unfollow':'follow' }}
						</div>
					</div>
				</div>
				<div class="basic-info">
					<b class="name">{{ user_curr.displayName }}</b><br>
					<div class="bio ellipsis">{{ user_curr.bio }}</div>
				</div>
				<div class="basic-count">
					<span><b>{{ user_curr_topics.length }}</b> Topics</span>
					<span v-if="user_curr.favorites">
						<b>{{ user_curr.favorites.length }}</b> Favorites</span>
					<span v-if="user_curr.followers">
						<b>{{ user_curr.followers.length }}</b> Followers</span>
					<span v-if="user_curr.followings">
						<b>{{ user_curr.followings.length }}</b> Followings</span>
				</div>
			</div>
			<div class="tab-panel block main">
				<div class="tabs flex middle_center">
					<div class="tab" :class="{'active':tab_curr==='topic'}" 
						@click="switchTab('topic')">Topics</div>
					<div class="tab" :class="{'active':tab_curr==='favorite'}" 
						@click="switchTab('favorite')">Favorites</div>
					<div class="tab" :class="{'active':tab_curr==='follower'}" 
						@click="switchTab('follower')">Followers</div>
					<div class="tab" :class="{'active':tab_curr==='following'}" 
						@click="switchTab('following')">Followings</div>
					<div class="tab" :class="{'active':tab_curr==='reply'}" 
						@click="switchTab('reply')">Replies</div>
				</div>
				<div class="panels">
					<div class="panel" v-if="tab_curr==='topic'">
						<div class="panel-empty-data" v-if="!user_curr_topics.length">
							<span><b>{{ user_curr.displayName }}</b> has no topics yet.</span>
						</div>
						<div class="panel-topic" v-if="user_curr_topics.length">
							<topic-item v-for="e in user_curr_topics" :e="e" :mode="'user_topics'"></topic-item>
						</div>
					</div>
					<div class="panel" v-if="tab_curr==='favorite'">
						<div class="panel-empty-data" v-if="!user_curr_favorites.length">
							<span><b>{{ user_curr.displayName }}</b> has no favorite topics.</span>
						</div>
						<div class="panel-favorite" v-else>
							<topic-item class="user-topic" v-for="e in user_curr_favorites" :e="e" :mode="'user_favorites'"></topic-item>
						</div>
					</div>
					<div class="panel" v-if="tab_curr==='follower'">
						<div class="panel-empty-data" v-if="!user_curr_followers.length">
							<span><b>{{ user_curr.displayName }}</b> has no followers.</span>
						</div>
						<div class="panel-follower" v-else>
							<user-item v-for="e in user_curr_followers" :e="e"></user-item>
						</div>
					</div>
					<div class="panel" v-if="tab_curr==='following'">
						<div class="panel-empty-data" v-if="!user_curr_followings.length">
							<span><b>{{ user_curr.displayName }}</b> has no following users.</span>
						</div>
						<div class="panel-following" v-else>
							<user-item v-for="e in user_curr_followings" :e="e"></user-item>
						</div>
					</div>
					<div class="panel" v-if="tab_curr==='reply'">
						<div class="panel-empty-data" v-if="!user_curr_replys.length">
							<span><b>{{ user_curr.displayName }}</b> has no replies yet.</span>
						</div>
						<div class="panel-reply" v-if="user_curr_replys.length">
							<user-reply-item class="user-reply" v-for="e in user_curr_replys" 
								:key="e._id" :topic="e.topicInfo" :e="e"></user-reply-item>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
</template>
<script>
import TopicItem from '../components/listItem/Topic.vue'
import UserItem from '../components/listItem/User.vue'
import UserReplyItem from '../components/listItem/UserReply.vue'
import { mapGetters } from 'vuex'

function preFetch (store) {
	const { username } = store.state.route.params
	return store.dispatch('fetch_user', username).then(res => {
		return store.dispatch('fetch_user_topics')
	})
}

export default {
	name: 'view-user',
	components: { TopicItem, UserItem, UserReplyItem },
	preFetch,
	data: () => ({
		tab_curr: 'topic',
	}),
	computed: {
		...mapGetters([
			'user_curr', 'user_curr_topics', 'user_curr_replys', 'user_curr_favorites',
			'user_curr_followings', 'user_curr_followers', 'login_user'
		]),
		is_following () { return this.$store.getters.user_curr_is_following }
	},
	watch: {
		'$route.params.username' () {
			this.tab_curr = 'topic'
			return preFetch(this.$store)
		},
	},
	methods: {
		switchTab (e) { 
			if (this.tab_curr !== e) {
				this.tab_curr = e
				return this.$store.dispatch(`fetch_user_${e}s`)
			}
		},
		followUser () {
			if (!this.login_user._id) { 
				// require login
				sessionStorage.redirect = location.href
				sessionStorage.info = 'You need to login to follow the user.'
				this.$router.push('/login')
			} else {
				let id = this.user_curr._id
				return this.$store.dispatch('follow_user', { id, action: this.is_following?'unfollow':'follow' })
					.then(res => {
						if (res.code===200) {
							this.$store.dispatch('is_following', { id })
							this.$store.dispatch('fetch_user_followers')
						}
					})
			}
		}
	},
	beforeMount () {
		if (this.$root._isMounted) {
			preFetch(this.$store).then(() => {
				if (!this.user_curr._id) this.$router.push('/404')
			})
		} else {
			if (!this.user_curr._id) this.$router.push('/404')
		}
	},
	mounted () {
		// TODO: 没发出去
		if (this.login_user._id && this.user_curr._id 
		&& this.login_user._id !== this.user_curr._id)
			return store.dispatch('is_following', { id })
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
.view-user
	.profile
		position relative
		.avatar
			position absolute
			width 80px
			height 80px
		.btn-group
			position absolute
			right 10px
			.btn
				padding 4px 12px
		.basic-info
			margin-left 90px
			height 45px
			.name
				line-height 1.5em
			.bio
				color c-jianshu-hl
				font-size .8em
		.basic-count
			margin-left 90px
			height 35px
			>span
				display inline-block
				margin-right 20px
				height 100%
				line-height 35px
				text-align center
				font-size .9em
	.tab-panel
		.tabs
			color c-text-grey
			height 40px
			.tab
				height 100%
				line-height 40px
				text-align center
				flex-grow 1
				border-bottom 1px solid c-border
				transition color .2s ease
				&.active
					color darken(c-jianshu-hl, 20)
					border-bottom 3px solid darken(c-jianshu-hl, 20)
		.panels
			.panel
				height 700px
				overflow auto
				.panel-empty-data
					line-height 70px
					text-align center
					span
						padding 8px 20px
						background-color c-bg
						border-radius 4px
</style>