<template>
<div class="page page-404">
	<div class="wide-screen">
		<div class="block main flex middle_center redirect_col">
			<div class="title">4-Missing-0-Node-4</div>
			<div class="redirect"><router-link to="/" class="blue">Back to Home</router-link></div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'page-404'
}
</script>
<style lang="stylus">
@import '~styl_var'
.page-404
	.block
		height 404px
		.title
			font-size 2em
			line-height 4em
		.redirect
			font-size 1.5em
</style>
