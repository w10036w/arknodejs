<template>
<div class="view view-topic">
	<div class="wide-screen row">
		<main class="block" v-if="topic_curr._id">
			<div class="topic-header pad-lr-10">
				<div class="title ellipsis">{{ topic_curr.title }}</div>
				<div class="subtitle ellipsis">
					<span>
					<router-link :to="'/user/'+topic_curr.authorInfo.username"
						><b>{{ topic_curr.authorInfo.username }}</b></router-link></span>
					<span>Published <b>{{ topic_curr.createAt | std2hiDdmy }}</b></span>
					<span>From 
						<router-link :to="'/?category='+topic_curr.categoryInfo.path">
							<b>{{ topic_curr.categoryInfo.name }}</b>
						</router-link></span>
				</div>
				<div class="tags ellipsis">
					<span class="tag btn rad-4 btn-blue" 
					v-for="e in topic_curr.tagsInfo">{{ e.name }}</span>
				</div>
				<router-link class="avatar" :to="'/user/'+topic_curr.authorInfo.username">
					<img :src="topic_curr.authorInfo.avatar">
				</router-link>
				<span class="pv"><b>{{ topic_curr.visitCount|fmtNum }}</b> views</span>
				<div class="btn-group right">
					<span class="btn-like" @click="favoriteTopic">
						<i class="fa hover_scale" :class="liked?'fa-heart':'fa-heart-o'"></i>
						<span>{{ topic_curr.likedUsers.length|fmtNum }}</span>
					</span><br>
					<router-link :to="'/edit/topic/'+topic_curr.path" 
						v-if="login_user._id===topic_curr.authorId">
						<span class="btn btn-edit btn-blue-h-b">Edit</span>
					</router-link>
					<span class="btn btn-share btn-blue-h-b" v-else
						@click="openShareBox">Share</span>

				</div>
			</div>
			<article class="topic pad-lr-20 md-body">
				<div v-html="topic_curr.content"></div>
				<div id="widget-script" class="hide"></div>
			</article>
			<footer class="pager pad-lr-10">
				<router-link v-if="topic_prev._id" :to="'/topic/'+topic_prev.path">
				<span class="btn btn-tealBlue left ellipsis">
					<i class="fa fa-angle-double-left"></i>
				  {{ topic_prev.title }}</span>
				</router-link>
				<router-link v-if="topic_next._id" :to="'/topic/'+topic_next.path">
				<span class="btn btn-tealBlue right ellipsis">
					{{ topic_next.title }} 
					<i class="fa fa-angle-double-right"></i>
					</span>
				</router-link>
			</footer>
		</main>
		<div class="block replies">
			<header class="pad-lr-10">
				<span v-if="topic_curr.allowComment"><b>{{ topic_curr_replys.length }}</b> Relies</span>
				<span v-else>Comments not allowed</span>
			</header>
			<div class="reply_list" v-if="topic_curr_replys.length">
				<reply-item v-for="e in topic_curr_replys" :e="e" :key="e._id"></reply-item>
			</div>
		</div>
		<edit-reply class="block" v-if="topic_curr.allowComment && login_user._id"></edit-reply>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import ReplyItem from '../components/listItem/Reply.vue'
import UserBox from '../components/item/UserBox.vue'
import EditReply from '../components/item/EditReply.vue'

function preFetch (store) {
	const path = store.state.route.params.path
	return store.dispatch('fetch_topic', { path }).then(res => {
		if (res.code>399) return 
		let topicId = res.data._id
		let username = res.data.authorInfo.username
		if (username && topicId)
			return Promise.all([
				store.dispatch('fetch_topic_replys', { criteria: { topicId } })
			])
	})
}

export default {
	name: 'view-topic',
	components: { ReplyItem, UserBox, EditReply },
	metaInfo () {
		return {
			title: this.topic_curr.title,
			meta: [
				{ name: 'description', content: 'topic_curr.summary' },
			]
		}
	},
	preFetch,
	computed: {
		liked () { return this.login_user && 
			this.topic_curr.likedUsers.includes(this.login_user._id) },
		...mapGetters([
			'topic_curr', 'topic_prev', 'topic_next', 'topic_curr_replys',
			'login_user', 'reply_list'
		])
	},
	watch: {
		'$route.params.path' () {
			return preFetch(this.$store)
		},
	},
	methods: {
		favoriteTopic () {
			if (this.login_user) {
				const id = this.topic_curr._id
				const action = this.liked ? 'unfavorite':'favorite'
				this.$store.dispatch('favorite_topic', { id, action })
					.then(res => {
						if (res > 200) return
						const userId = this.login_user._id
						this.$store.dispatch('_favorite_topic', { userId, action })
					})
			} else {
				sessionStorage.redirect = location.href
				sessionStorage.info = 'You need to login to like your favorite topics.'
				this.$router.push('/login')
			}
		},
		openShareBox () {

		}
	},
	beforeMount () {
		if (this.$root._isMounted) {
			preFetch(this.$store).then(() => {
				if (!this.topic_curr._id) this.$router.push('/404')
			})
		} else {
			if (!this.topic_curr._id) this.$router.push('/404')
		}
	},
	mounted () {
		// embedded SNS widget, currently support twitter and instagram's
		if (typeof twttr!=='undefined' && /twitter-tweet/.test(this.topic_curr.content))  twttr.widgets.load()
		if (typeof instgrm!=='undefined' && /instagram-media/.test(this.topic_curr.content))  instgrm.Embeds.process()
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
.view-topic
	main
		.topic-header
			position relative
			padding-top 6px
			padding-bottom 6px
			a:hover
				text-decoration underline
			.ellipsis
				padding-left 68px
				padding-right 60px
			.title
				line-height 1.5em
				color #1f3f99
				font-size 1.2em
				font-weight bold
			.subtitle
				line-height 1.5em
				font-size .8em
				color c-text-grey
				span
					margin-right 1.5rem
			.btn-group
				position absolute
				top 0
				right 10px
				.btn-like
					line-height 55px
					.fa
						color c-ios-red
					span
						margin-left 10px
				.btn-edit, .btn-share
					padding 4px 12px
			.avatar
				position absolute
				left 10px
				top 6px
				width 48px
				height 48px
			.pv
				position absolute
				line-height 20px
				top 66px
				font-size .7em
				b
					font-size .8rem
			.btn-group
				position absolute
			.tags
				margin-top 10px
			.tag
				margin 2px 5px 2px 0
				padding 2px 5px
				font-size .8em
		article
			border-top 1px solid c-border
			border-bottom 1px solid c-border
	.replies
		margin-top 10px
		margin-bottom 10px
		line-height h-block-header
</style>
