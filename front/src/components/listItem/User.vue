<template>
<div class="user-item pad-10">
  <router-link :to="'/user/'+e.username">
    <div class="avatar">
      <img :src="e.avatar">
    </div>
  </router-link>
  <div class="basic-info">
    <div class="name ellipsis">
      <router-link :to="'/user/'+e.username">{{ e.displayName }}</router-link>
    </div>
    <div class="bio ellipsis">{{ e.bio || 'nothing left and nothing right' }}</div>
  </div>
</div>  
</template>
<script>
export default {
  props: ['e'],
}
</script>
<style lang="stylus">
@import '~styl_var'
.user-item
  position relative
  border-bottom 1px solid c-border
  .avatar
    position absolute
    top 10px
    left 10px
    width 50px
    height 50px
  .basic-info, .basic-count
    font-size .9em
    margin-left 60px
    line-height 25px
    span
      margin-right 10px
  .name
    font-weight bold
    font-size 1.3em
  .bio
    color c-text-grey
</style>