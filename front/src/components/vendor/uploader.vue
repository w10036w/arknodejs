<template>
<div class="upload">
  <input type="file" @change="onFile()"
    accept="image/gif, image/png, image/jpeg, image/bmp, image/webp">
  <div class="upload-files" v-for="n in urls">
    <div class="upload-files">
      <img :src="n">
    </div>
    <a @click="handleRemove($index)">remove</a>
  </div>
  <div :id="container" class="upload-container">
    <div class="upload-files" :id="files" v-if="urls.length < max">
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['target', 'max', 'urls', 'dropzone', 'files', 'multi'],
  methods: {
    oneFile (ev) {
      let files = ev.target.files
			let l = files.length
      if (max && l < max) {

      }
    },
    handleRemove (file) {
      this.urls.splice(i, 1)
    },
    handlePreview (file) {
      
    }
  }
}
</script>
<style scoped>
</style>