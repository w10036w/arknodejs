<template>
<div id="side-msg" class="flex redirect_col">
	<i class="right fa fa-close" @click="clearFlash"></i>
</div>
</template>
<script>
export default {
	name: 'widget-side-msg',
	computed: {
		flash () { return this.$store.getters.flash }
	},
	methods: {
		clearFlash () {
			this.$store.dispatch('clear_flash')
		}
	}
}
</script>
<style lang="stylus">
@import '~styl_var'
#side-msg
	position fixed
	top h-nav + 10px
	right -100%
	width 200px
	padding 10px


</style>