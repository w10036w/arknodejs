<template>
<el-upload
  class="upload-demo"
  action="//up.qbox.me/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
	:before-upload="beforeUpload"
	:show-upload-list="true"
	:data="form">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</template>
<script>
  export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
			beforeUpload (file) {
				let key = file.name
				return this.$store.dispatch('cdn_token', {
					key
				}).then(response => {
					this.upToken = response.upToken
					this.key = response.key
					this.bucket = response.bucket
					this.form = {
						key,
						token: response.upToken
					}
				})
			}
    }
  }
</script>