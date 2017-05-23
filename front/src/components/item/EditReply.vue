<template>
<div class="edit-reply-box">
	<header class="pad-lr-10">
		<span class="reply-to ellipsis">Reply to 
		<b>{{ replyTo }}</b></span>
		<div class="btn-group right">
			<span class="btn-icon" @click="switchType">
				<i class="fa trans_200 fa-2x" :class="type==='text'?'fa-toggle-off':'fa-toggle-on'"></i>
			</span>
				
			<span class="btn btn-reply btn-tealBlue" @click="replyTopic"
				>{{ action }}</span>
		</div>
	</header>	
	<div class="ctrl"></div>
	<div class="row pad-10">
		<div class="edit-area">
			<textarea class="rad-4" v-model="content"></textarea>
		</div>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { marked } from '../../utils/marked'

export default {
	
	data: () => ({
		content: '',
		type: 'text',
		action: 'create',
		replyTo: 'Topic'
	}),
	computed: {
		...mapGetters([
			'reply_curr', 'login_user', 'topic_curr'
		])
	},
	watch: {
		'reply_curr' () {
			if (this.reply_curr.replyToUsername) { // reply to reply
				this.content = ''
				this.type = 'text'
				this.replyTo = this.reply_curr.replyToUsername
				this.action = 'create'
			} else if (this.reply_curr.type) { // edit reply
				this.content = this.reply_curr.content
				this.type = this.reply_curr.type
				this.replyTo = 'Topic'
				this.action = 'update'
			} else { // reply to topic
				this.content = ''
				this.type = 'text'
				this.replyTo = 'Topic'
				this.action = 'create'
			}
      document.querySelector('.edit-reply-box textarea').focus()
		}
	},
	methods: {
		switchType () {
			if (this.type==='text') this.type = 'marked'
			else this.type = 'text'
		},
		replyTopic () {
			if (this.login_user._id) {
				if (this.content === '')
					return this.$store.dispatch('logger', { code: 400, note: 'empty reply content' })
				let id
				const body = {
					content: this.content,
					type: this.type,
					topicId: this.topic_curr._id
				}
				if (this.reply_curr.replyToUsername)
					body.replyToUsername = this.reply_curr.replyToUsername
				if (this.action==='update') 	
					id = this.reply_curr._id
				
				this.$store.dispatch(`${this.action}_reply`, { id, body }).then(res => {
					if (res.code>200) return
					this.content = ''
					this.type = ''
					this.$store.dispatch('edit_reply')
					let criteria = { topicId: body.topicId }
					return this.$store.dispatch('fetch_topic_replys', { criteria })
				})
			} else {
				sessionStorage.redirect = location.href
				sessionStorage.info = 'You need to login to reply a topic.'
				this.$router.push('/login')
			}
		}
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
.edit-reply-box
	.reply-to
		display inline-block
		max-width 450px
		padding-top 10px
	.btn-icon
		padding 4px
		i
			vertical-align middle
	.btn
		margin 6px 0 6px 10px
		padding 4px 12px
	
	.row
		textarea
			border-color c-grey
			width 100%
			min-height 100px
</style>