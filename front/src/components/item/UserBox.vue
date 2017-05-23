<template>
<div class="user-box block">
  <header class="pad-lr-10">AUTHOR</header>
  <div class="pad-10 flex align_center">
    <router-link :to="'/user/'+e.username" class="avatar">
      <img :src="e.avatar">
    </router-link>
    <span class="username">
      <router-link :to="'/user/'+e.username">
        <b>{{ e.username }}</b>
      </router-link>
    </span>
  </div>
  <div class="btn-group pad-10 flex around_center">
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['e', 'topicId'],
  computed: {
    ...mapGetters([
			'login_user', 'user_curr'
		])
  }
}
</script>
<style lang="stylus">
@import '~styl_var'
.user-box
  header
    line-height h-block-header
  .avatar
    height 48px
    width 48px
  .username
    margin-left 1em
    max-width 180px
    font-size .9em
    white-space nowrap
  .btn-group
    .btn
      padding 4px 12px
</style>