<template>
<div class="topic-item flex align_center trans_200 pad-lr-10">
  <router-link :to="'/user/'+e.authorInfo.username" v-if="mode!=='user_topics'">
    <div class="avatar">
    <img width="35" :src="e.authorInfo.avatar">
    </div>
  </router-link>
  <span class="count">
    <em class="rc">{{ e.replyCount }}</em> /
    <span class="pv">{{ e.visitCount }}</span></span>
  <span v-if="!mode||mode.indexOf('user_')===-1">
    <span class="at-top" v-if="e.top">TOP</span>
    <span class="category" v-else>{{ e.categoryInfo.name }}</span>
  </span>
  <span class="title ellipsis flex_1">
    <router-link :to="'/topic/'+e.path">{{ e.title }}</router-link>
  </span>
  <div class="last-reply self_end" v-if="!mode||mode.indexOf('user_')===-1">
    <b>{{ e.lastReplyAt | std2timeAgo }}</b> ago
  </div>
</div>  
</template>
<script>

export default {
  props: ['e', 'mode']
}
</script>
<style lang="stylus">
@import '~styl_var'
.topic-item
  border-bottom 1px solid c-border
  height 50px
  line-height 50px
  &:hover
    background-color rgba(black, .05)
  .avatar
    width 35px
    height 35px
  .at-top, .category
    padding 2px 5px
    color white
    background-color c-cnode-green
    border-radius 4px
    line-height 20px
    margin-right 5px
    min-width 35px
    text-align center
  .category
    font-size .8em
  .title
    min-width 66%
  a
    &:hover
      text-decoration underline
    &:visited
      color #778087
  .count
    font-size .8em
    width 60px
    text-align center
    .rc
      color c-ios-blue
      font-size .8em
    .pv
      font-size .7em
      color c-text-grey
  .last-reply
    color #778087
    font-size .7em
</style>