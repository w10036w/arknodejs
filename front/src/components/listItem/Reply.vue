<template>
<div class="reply-box pad-10" :id="'reply_'+e._id">
  <a :href="'#reply_'+e._id"></a>
  <div class="avatar">
    <router-link :to="'/user/'+username">
      <img :src="avatar" alt="">
    </router-link>
  </div>
  <div class="header">
    <router-link :to="'/user/'+username" class="username"><b>{{ username }}</b></router-link>
    <span class="time">{{ e.createAt|std2hiDdmy }}</span>
    <span class="time" v-if="e.createAt!==e.updateAt">, edit {{ e.updateAt|std2timeAgo }} ago</span>
  </div>
  
  <div class="content md-body">
    <router-link v-if="e.replyToUsername" :to="'/user/'+e.replyToUsername"
      >@{{e.replyToUsername}}</router-link> 
    {{ e.type==='text'?content:'' }}
    <div v-html="content" v-if="e.type!=='text'"></div>
  </div>
  <div class="btn-group">
    <span class="btn btn-edit" @click="editReply(e._id)"
      v-if="e.authorId===login_user._id"><i class="fa fa-edit"></i>
    </span>
    <span class="btn btn-reply" @click="replyTo(username)">
      <i class="fa fa-reply"></i>
    </span>
  </div>
</div>  
</template>
<script>

import { marked } from '../../utils/marked'
export default {
  props: ['e', 'author', 'mode'],
  computed: {
    login_user () { return this.$store.getters.login_user },
    avatar () { return this.e.authorInfo.avatar },
    username () { return this.e.authorInfo.username },
    content () { return this.e.type==='text' ? this.e.content : marked(this.e.content) }
  },
  methods: {
    replyTo (username) {
      this.$store.dispatch('reply_reply', username)
    },
    editReply (id) {
      this.$store.dispatch('edit_reply', id)
    }
  }
}
</script>
<style lang="stylus">
@import '~styl_var'
.reply-box
  position relative
  border-bottom 1px solid c-border
  .header
    margin-left 50px
    margin-right 60px
    line-height 18px
    .username
      font-size .9em
      margin-right 1em
    .time
      color c-m-5 
      font-size .75em
  .content
    margin-left 50px
    font-size .85em
  .avatar
    position absolute
    top 10px
    left 10px
    width 35px
    height 35px
  .btn-group
    position absolute
    top 0
    right 10px
    bottom 0
</style>