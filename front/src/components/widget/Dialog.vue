<!--dialog can only be one at the same time  -->
<template>
<transition name="modal">
<div id="dialog" class="full trans_200" v-show="dialog">
  <div class="dialog-mask full" @click="closeDialog"></div>
  <div class="add-tag dialog block trans_200" v-if="dialog==='add_tag'">
    <header class="pad-lr-10">Add Tag</header>
    <div class="tag-list pad-lr-10">
      <span class="tag rad-4 btn btn-blue-h-b"
        v-for="e in tag_list">{{ e.name }}</span>
    </div>
    <div class="tag-input pad-lr-10">
      <input type="text" placeholder="name" v-model="tag.name" ref="add_tag">
      <input type="text" placeholder="path" v-model="tag.path">
    </div>
    <div class="btn-group flex around_center">
      <span class="btn btn-tealBlue" @click="addTag">ADD</span>
      <span class="btn btn-tealBlue-h-b" @click="closeDialog">CANCEL</span>
    </div>
  </div>
  <div class="add-category dialog block trans_200" v-show="dialog==='add_category'">
    <header class="pad-lr-10">Add Category
      <span class="right" @click="closeDialog">
        <i class="btn fa fa-close right"></i>
      </span>
    </header>
    <div class="category-list pad-lr-10">
      <span class="tag rad-4 btn btn-blue-h-b"
        v-for="e in category_list">{{ e.name }}</span>
    </div>
    <div class="category-input pad-lr-10">
      <input type="text" placeholder="name" v-model="category.name" ref="add_category">
      <input type="text" placeholder="path" v-model="category.path">
    </div>
    <div class="btn-group flex around_center">
      <span class="btn btn-green" @click="addCategory">ADD</span>
      <span class="btn btn-green-h-b" @click="closeDialog">CANCEL</span>
    </div>
  </div>
</div>  
</transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'widget-dialog',
  data: () => ({
    tag: { name: '', path: '' },
    category: { name: '', path: '' }
  }),
  computed: {
    call () { return this.$refs.add_category }
  },
  watch: {
    'tag.name' () {
      // TODO: validate redundant names
      this.tag.path = this.tag.name
        .toLowerCase().replace(/\s+/g, '-')
    },
    'category.name' () {
      this.category.path = this.category.name
        .toLowerCase().replace(/\s+/g, '-')
    }
  },
  computed: {
    ...mapGetters([
      'dialog', 'tag_list', 'category_list'
    ])
  },
  methods: {
    addTag () {
      let name = this.tag.name, path = this.tag.path
      this.$store.dispatch('create_tag', { name, path })
      .then(res => {
        if (res.code>200) {
          this.$store.dispatch('fetch_tags')
          this.tag.name = ''
          this.closeDialog()
        }
      })
    },
    addCategory () {
      let name = this.category.name, path = this.category.path
      this.$store.dispatch('create_category', { name, path })
      .then(res => {
        if (res.code>200) {
          this.category.name = ''
          this.$store.dispatch('fetch_categories')
          this.closeDialog()
        }
      })
    },
    closeDialog () {
      this.$store.dispatch('dialog', '')
    }
  }
}
</script>
<style lang="stylus">
@import '~styl_var'
#dialog
  position fixed!important
  z-index z-dialog
  .dialog-mask
    background-color rgba(black, .7)
    z-index -1
  .dialog
    position absolute
    top 50%
    left 50%
    header
      line-height h-block-header
      .right
        line-height h-block-header
        font-size 1.1em
    .fa-close
      color c-ios-red
        
  .add-tag, .add-category
    width 400px
    height 500px
    margin-top -250px
    margin-left -200px
    .tag, .category
      float left
      margin 2px 5px 2px 0
      padding 2px 5px
      font-size .8em
    .tag-list, .category-list
      height 300px
      overflow auto
      padding-top 10px
    .tag-input, .category-input
      height 100px
      text-align center
      input
        text-align center
        width 80%
    .btn-group
      .btn
        padding 3px 12px
</style>