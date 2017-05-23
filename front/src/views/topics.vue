<template>
<div class="view view-topics">
	<div class="wide-screen row">
		<main class="block main">
			<header class="tabs-category pad-lr-10">
				<div class="tab-category rad-4" :class="{'active':!curr_category}"
						 @click="switchCategory(null)">All</div>
				<div class="tab-category rad-4" 
						 v-for="e in category_list" 
						 :class="{'active':curr_category===e}"
						 @click="switchCategory(e)">
					{{ e.name }}
				</div>
			</header>
			<div class="topic-list" >
				<topic-item v-for="e in topic_list" :e="e"></topic-item>
			</div>
			<footer class="pager pad-lr-10">
				<router-link v-if="page>1" :to="'/topic?page='+page--">
				<span class="btn btn-tealBlue left">
					<i class="fa fa-angle-double-left"></i>
					{{ prev.title }}</span>
				</router-link>
				<router-link v-if="topic_list_next.length" :to="'/topic?page='+page++">
				<span class="btn btn-tealBlue right">
					{{ next.title }} </span>
					<i class="fa fa-angle-double-right"></i>
				</router-link>
			</footer>
		</main>
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import TopicItem from '../components/listItem/Topic.vue'

function preFetch (store) {
	const path = store.state.route.params.path
	const page = parseInt(store.state.route.query.page) || 1
	let skip = (page-1)*30
	let sort = JSON.stringify({ top: -1, _id: -1 })
	return Promise.all([
		store.dispatch('fetch_categories'),
		store.dispatch('fetch_topics', { skip, sort }),
		store.dispatch('fetch_topics', { skip: skip+30, sort, count: true }),
	])
}

export default {
	components: { TopicItem },
	metaInfo () {
		return {
			title: 'topic list',
		}
	},
	data: () => ({
		curr_category: null
	}),
	watch: {
		'curr_category' () {
			let criteria
			if (this.curr_category)
			  criteria = { category: this.curr_category._id }
			this.$store.dispatch('fetch_topics', 
				criteria ? { criteria } : { sort: JSON.stringify({ top: -1, _id: -1 }) })
		}
	},
	preFetch,
	computed: {
		page () { return this.$route.query.page },
		...mapGetters(['topic_list', 'category_list', 'topic_list_next']),
	},
	methods: {
		switchCategory (cate) {
			this.curr_category = cate
		}
	},
	beforeMount () {
		this.$root._isMounted && preFetch(this.$store)
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
.view-topics
	main
		margin-right 305px
		.tabs-category
			color c-ios-green
			.tab-category
				display inline-block
				margin 6px 3px
				padding 3px 12px
				cursor pointer
				&:active, &:hover
					background-color white
				&.active
					background-color c-ios-green
					color white
		.topic-list
			min-height 800px
</style>
