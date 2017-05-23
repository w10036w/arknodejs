<template>
<div class="user-reply-box pad-10" :id="e._id">
  <router-link :to="'/topic/'+topic.path+'#reply_'+e._id" class="md-body">
    <span class="content rad-4">{{ e.content|ellipsis }}</span> <br>in <b class="topic-title">{{ topic.path|ellipsis }}</b>
  </router-link>
  <span class="time right">{{ e.createAt|std2hiDdmy }}</span>
</div>  
</template>
<script>

export default {
  props: ['e', 'topic'],
}
</script>
<style lang="stylus">
@import '~styl_var'
.user-reply-box
  position relative
  border-bottom 1px solid c-border
  .time
    font-size .8em
  .content
    padding 2px 5px
    line-height 24px
    background-color c-grey
  .topic-title
    color c-ios-blue
</style>