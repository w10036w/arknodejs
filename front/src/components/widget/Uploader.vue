<template>
<div class="images">
  <b>Upload Image</b> 
  <i class="fa right" :class="foldUpload?'fa-caret-down':'fa-caret-up'"
    @click="foldUpload=!foldUpload"></i>
  <div v-show="!foldUpload">
    <span class="btn btn-green btn-upload" @click="upload">UPLOAD</span>
    <span>{{ uploadQueue.length===0?'Ready':'Uploading' }}</span>
    <input type="file" @change="onFile" name="file" ref="file"
        accept="image/gif, image/png, image/jpeg, image/bmp, image/webp">
    <div class="uploaded" v-for="e, i in imgsBase64">
      <a :href="e" target="_blank" class="center">
        <img class="rad-4" :src="e" :alt="e"><br>
      </a>
      <div class="btn-group flex around_center">
        <span class="btn" :class="thumbnail===imgsUrl[i]?'btn-orange':'btn-orange-h-b'"
          @click="setThumbnail(i)" v-show="imgsUrl[i]">Thumbnail
          <i class="fa fa-check-circle" v-show="thumbnail===imgsUrl[i]"></i>
        </span>
        <span class="btn btn-red" @click="removeImage(i)">Remove</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { fileReader } from '~utils/dom'
export default {
  data: () => ({
    imgFiles: [],
		imgsBase64: [],
		imgsUrl: [],
		uploadQueue: [],
		foldUpload: false
  }),
  methods: {
    onFile (ev) {
			const files = ev.target.files
			const i = files.length-1
			const file = files[i]
			const name = `${new Date().toISOString().substr(0, 10).replace('-','')}/${file.name}`
			this.uploadQueue.push(1) // in queue
			let item
			let width, height
			fileReader(file).then(e => {
				this.imgsBase64.push(e.result)
				return this.$store.dispatch('cdn_token', name)
			}).then(res => {
				if (res.code>200) return// error
				item = {
					file, name,
					token: res.data.token,
					key: res.data.key,
					host: res.data.host
				}
				this.imgFiles.push(item)
				return item
			}).then(e => {
				return this.$store.dispatch('cdn_img_upload', {
					key: e.key,
					file: e.file,
					token: e.token
				})
			}).then(res => {
				if (res.key) {
					// success
					const uri = this.imgFiles[0].host + res.key
					this.imgsUrl.push(uri)
					this.uploadQueue.pop() // popup one, order does not matter
					this.content += `<p class="center"><img src="${uri}"></p>` 
					
          // after inserting images
          const $preview = this.$refs.preview
					this.$nextTick(function () {
						smoothScroll(0, $preview.scrollHeight, $preview)
					})
					
				} else {
					// display failure msg
				}
			}).catch(e => {
				console.error(e)
			})
		},
		upload () { this.$refs.file.click() },
		setThumbnail (i) { 
			this.thumbnail = this.thumbnail===this.imgsUrl[i] ? '' : this.imgsUrl[i]
		},
		removeImage (i) {
			this.imgsBase64.splice(i, 1)
		},
  }
}
</script>