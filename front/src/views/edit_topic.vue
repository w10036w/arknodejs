<template>
<div class="view view-edit-topic">
	<div class="full-screen row pad-lr-10">
		<aside class="block right">
			<nav class="navigator pad-lr-10">Operations</nav>
			<!--save first then can publish-->
			<div class="box btn-group flex around_center">
				<span class="btn btn-green" @click="save" ><b>SAVE</b></span>
				<span class="btn btn-blue right" @click="publish"><b>PUBLISH</b></span>
			</div>
			<div class="box">
				<b>Choose a category</b>
				<i class="btn fa fa-plus hover_rotate_90 right" 
					v-if="login_user.role==='editor'" @click="openDialog('add_category')"></i>
				<div class="categories">
					<span class="category btn rad-4" 
						:class="category===e._id?'btn-green':'btn-green-h-b'"
						v-for="e in categories" @click="switchCategory(e._id)">
						{{ e.name }}
					</span>
				</div>
			</div>
			<!--tags-->
			<div class="box">
				<b>Select tags</b>
					<i class="btn fa fa-plus right hover_rotate_90" 
						v-if="login_user.role==='editor'" @click="openDialog('add_tag')"></i>
				<div class="tags">
					<span class="tag btn rad-4" 
						:class="selectedTags.indexOf(e._id)>-1?'btn-blue':'btn-blue-h-b'"
						v-for="e in tags" @click="addTag(e._id)">
						{{ e.name }}
					</span>
				</div>
			</div>
			<div class="box switches row">
				<label for="push_top">
					<input type="checkbox" id="push_top" v-model="top"> Push to top
				</label><br>
				<label for="enable_toc">
					<input type="checkbox" id="enable_toc" v-model="enableToc"> Enable TOC
				</label><br>
				<label for="allow_comment">
					<input type="checkbox" id="allow_comment" v-model="allowComment"> Allow comment
				</label><br>
				<label for="private_topic">
					<input type="checkbox" id="private_topic" v-model="hidden"> Private
				</label><br>
			</div>
			<div class="thumbnail box">
				<b>Current Thumbnail</b><br>
				<p class="center">
					<a :href="dyn_thumbnail?dyn_thumbnail:'#'" target="_blank"
						><img class="rad-4" width="40%" v-if="dyn_thumbnail" :src="dyn_thumbnail+'-tn.jpg'"></a>
				</p>
			</div>
			<div class="box images">
				<b>Upload Image</b> 
				<i class="fa right" :class="foldUpload?'fa-caret-down':'fa-caret-up'"
					@click="foldUpload=!foldUpload"></i>
				<div v-show="!foldUpload">
					<span class="btn btn-green btn-upload" @click="upload">UPLOAD</span>
					<span>{{ uploadQueue.length===0?'Ready':'Uploading' }}</span>
					<input type="file" @change="onFile" name="file" ref="file"
							accept="image/gif, image/png, image/jpeg, image/bmp, image/webp">
					<div class="uploaded" v-for="e, i in imgsBase64">
						<a :href="e" target="_blank" class="center">
							<img class="rad-4" :src="e" :alt="e"><br>
						</a>
						<div class="btn-group flex around_center">
							<span class="btn" :class="thumbnail===imgsUrl[i]?'btn-orange':'btn-orange-h-b'"
								@click="setThumbnail(i)" v-show="imgsUrl[i]">Thumbnail
								<i class="fa fa-check-circle" v-show="thumbnail===imgsUrl[i]"></i>
							</span>
							<span class="btn btn-red" @click="removeImage(i)">Remove</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
		<main class="main block">
			<nav class="navigator pad-lr-10">
				<router-link to="/">Home</router-link> / {{ !topicPath ? 'Create' : 'Edit' }} a topic
			</nav>
			<div class="pad-lr-10">
				<input class="title" type="text" placeholder="Title" v-model="title">
				<input class="subtitle" type="text" placeholder="Path" v-model="path">
				<div class="mode">
					<span class="btn btn-switch" :class="mode==0?'btn-blue':'btn-blue-h-b'"
								@click="mode=0">Write</span>
					<span class="btn btn-switch" :class="mode==1?'btn-blue':'btn-blue-h-b'"
								@click="mode=1">Split</span>
					<span class="btn btn-switch" :class="mode==2?'btn-blue':'btn-blue-h-b'"
								@click="mode=2">Preview</span>
					<a href="http://markdown-guide.readthedocs.io/en/latest/basics.html#blockquotes"
						 class="btn btn-tealBlue-h-b right" target="_blank">Syntax Guide</a>
				</div>
			</div>
			<div class="row edit-area" :class="'mode-'+mode">
				<textarea class="text box" v-model="content"></textarea>
				<div class="preview box md-body" v-html="preview_content" ref="preview"></div>
			</div>
		</main>
		<footer class="bg-white rad-4"></footer>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { marked, markedTOC } from '~utils/marked'
import { fileReader, smoothScroll } from '~utils/dom'

// no need SSR
function preFetch (store) {
	let path = store.state.route.params.path
	if (path) {
		return Promise.all([
			store.dispatch('fetch_topic', { path, query:{ origin:true } }),
			store.dispatch('fetch_categories'),
			store.dispatch('fetch_tags')
		])
	} else {
		return Promise.all([
			store.dispatch('fetch_categories'),
			store.dispatch('fetch_tags')
		])
	}
}

export default {
	data: () => ({
		title: '',
		path: '',
		thumbnail: '',
		dyn_thumbnail: '',
		content: '',
		type: 'md',

		toc: '',
		top: false,
		allowComment: true,
		hidden: false,

		category: '', // id
		selectedTags: [],

		enableToc: true,
		mode: 1, // 0 text only 1 both 2 preview only

		imgFiles: [],
		imgsBase64: [],
		imgsUrl: [],
		uploadQueue: [],
		foldUpload: false
	}),
	watch: {
		thumbnail () {
			this.dyn_thumbnail = this.thumbnail
		},
		// only listen to new topic 
		'$route.params.path' () {
			// clear data
			this.title = ''
			this.path = ''
			this.thumbnail = ''
			this.category = '' // id
			this.selectedTags = []
			this.content = ''
			this.toc = ''
			this.top = false
			this.allowComment = true
			this.hidden = false

			this.enableToc = true
			this.mode = 1 // 0 text only 1 both 2 preview only
		}
	},
	computed: {
		preview_content () { return marked(this.content) },

		categories () { return this.$store.getters.category_list },
		tags () { return this.$store.getters.tag_list },
		authorId () { return this.$store.getters.login_user._id },
		topicPath () { return this.$route.params.path },
		...mapGetters([
			'topic_curr', 'login_user'
		])
	},
	methods: {
		onFile (ev) {
			const files = ev.target.files
			const i = files.length-1
			const file = files[i]
			const name = `${new Date().toISOString().substr(0, 10).replace('-','')}/${file.name}`
			this.uploadQueue.push(1) // in queue
			let item
			let width, height
			fileReader(file).then(e => {
				this.imgsBase64.push(e.result)
				return this.$store.dispatch('cdn_token', name)
			}).then(res => {
				if (res.code>200) return// error
				item = {
					file, name,
					token: res.data.token,
					key: res.data.key,
					host: res.data.host
				}
				this.imgFiles.push(item)
				return item
			}).then(e => {
				return this.$store.dispatch('cdn_img_upload', {
					key: e.key,
					file: e.file,
					token: e.token
				})
			}).then(res => {
				if (res.key) {
					// success
					const uri = this.imgFiles[0].host + res.key
					this.imgsUrl.push(uri)
					this.uploadQueue.pop() // popup one, order does not matter
					this.content += `<p class="center"><img src="${uri}"></p>` 
					const $preview = this.$refs.preview
					this.$nextTick(function () {
						smoothScroll(0, $preview.scrollHeight, $preview)
					})
					
				} else {
					// display failure msg
				}
			}).catch(e => {
				console.error(e)
			})
		},
		upload () { this.$refs.file.click() },
		setThumbnail (i) { 
			this.thumbnail = this.thumbnail===this.imgsUrl[i] ? '' : this.imgsUrl[i]
		},
		removeImage (i) {
			this.imgsBase64.splice(i, 1)
		},

		switchCategory (cate) {
			this.category = cate
		},
		addTag (id) {
			const i = this.selectedTags.indexOf(id)
			if (i>-1) this.selectedTags.splice(i, 1)
			else this.selectedTags.push(id)
		},
		save () {
			let item 
			if (this.topic_curr._id)
				item = `edit_topic_${this.topic_curr._id}`
			else item = 'new_topic'
			localStorage[item] = JSON.stringify({
				title: this.title,
				path: this.path,
				mode: this.mode,
				content: this.content,

				thumbnail: this.thumbnail,
				category: this.category,
				selectedTags: this.selectedTags,
				
				top: this.top,
				enableToc: this.enableToc,
				allowComment: this.allowComment,
				hidden: this.hidden,

				// TODO: SSR mismatching Nodes
				//imgsBase64: this.imgsBase64
			})
		},
		publish () {
			//TODO: validation
			let body = {
				title: this.title,
				path: this.path,
				authorId: this.authorId,
				content: this.content,
				
				thumbnail: this.thumbnail,
				category: this.category,
				tags: this.selectedTags,
				
				top: this.top,
				allowComment: this.allowComment,
				hidden: this.hidden
			}
			// need to be figured out
			if (this.enableToc) body.toc = this.toc
			
			if (this.topicPath) {
				let id = this.topic_curr._id
				return this.$store.dispatch('update_topic', { id, body })
					.then(this.published)
			} else {
				return this.$store.dispatch('create_topic', body)
					.then(this.published)
			}

		},
		published (res) {
			if (res.code>200)
				return this.$store.dispatch('logger', res)
			
			if (this.topic_curr._id)
				localStorage.removeItem(`edit_topic_${this.topic_curr._id}`)
			else 
				localStorage.removeItem('new_topic')
			this.$store.dispatch('logger', res)
			this.$router.push('/topic/'+this.path)
		},
		openDialog (name) {
			this.$store.dispatch('dialog', name)
		},

		loadTopicFields (o) {
			this.title = o.title
			this.path = o.path
			this.thumbnail = o.thumbnail
			this.mode = o.mode || 1
			this.content = o.content
			
			this.category = o.category
			this.selectedTags = o.selectedTags || o.tags

			this.top = o.top
			this.enableToc = o.enableToc
			this.hidden = o.hidden
		},
		loadExistingTopicFields (store) {
			const topic_curr = store.getters.topic_curr
			let ls
			if (!topic_curr._id) {
				ls = localStorage['new_topic']
			} else {
				ls = localStorage[`edit_topic_${topic_curr._id}`]
			}
			if (ls) {
				try {
					this.loadTopicFields(JSON.parse(ls))
				} catch (e) { 
					console.log(e)
					this.loadTopicFields(topic_curr)
				}
			} else this.loadTopicFields(topic_curr)
		}
	},
	beforeMount () {
		let path = this.$route.params.path
		preFetch(this.$store).then(() => {
			if (path)
				this.loadExistingTopicFields(this.$store)
		})
	}
	// destory photo cache when page unloaded
}
</script>
<style lang="stylus">
@import '~styl_var'
.view-edit-topic
	.wide-screen
		height 100%
	.navigator
		height 35px
		line-height 35px
		font-size .9em
		background-color c-bg-light
		border-radius 4px 4px 0 0
	main
		margin-right 305px
		.btn
			padding 3px 12px
		header
			position relative
			padding-top 10px
			.title
				line-height 1.5em
				font-size 1.3em
				font-weight bold
			.subtitle
				line-height 1.1em
				color c-text
			.mode
				height 40px
				line-height 40px
				.btn.right
					margin-right 10px
				.btn-switch
					font-weight 700
					margin-left -1px
		.edit-area
			position relative
			padding 15px 10px
			height 700px
			.note
				text-align right
				width 120px9
				margin-left 10px
			&.mode-0
				.text
					width 100%
					border-right none
				.preview
					display none
			&.mode-1
				.text, .preview
					width 50%
				.text
					border-right 1px solid c-border
			&.mode-2
				.text
					display none
				.preview
					width 100%
			.text, .preview
				float left
				height 100%
				padding 5px
				overflow auto
				border-top 1px solid c-border
				border-bottom 1px solid c-border
			.text
				border-left none
			.preview
				float left
				margin-left -1px
	aside
		width 295px
		min-height 700px
		margin-bottom 20px
		.box
			padding 10px
			border-bottom 1px solid c-border
			.fa
				color c-ios-orange
				&.fa-check-circle
					color c-ios-green
		.btn-group .btn
			padding 5px 12px
		.tags, .categories
			margin-top 10px
		.category
			margin 3px 6px 3px 0
			padding 3px 6px
			font-size .9em
		.tag
			margin 2px 5px 2px 0
			padding 2px 5px
			font-size .8em
		.switches
			font-size .9em
			line-height 1.5em
		.images
			.btn-upload
				margin 10px 10px 10px 0
				padding 3px 6px 
				font-size .8em
			input[type="file"]
				display none
			.uploaded
				padding-top 10px
				border-bottom 1px solid c-border
				font-size .8em	
				.btn-group
					width 100%
					height 40px
				a
					display block
				img
					min-width 40px
					max-width 70%
				span
					padding 3px 6px

</style>
