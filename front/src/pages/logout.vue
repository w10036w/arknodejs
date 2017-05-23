<template>
</template>
<script>
export default {
	name: 'page-logout',
	methods: {
		logout () {
			// clear localStorage
			localStorage.removeItem('token')
			location.href = '/'
		}
	},
	beforeMount () {
		this.logout()
	}
}
</script>
