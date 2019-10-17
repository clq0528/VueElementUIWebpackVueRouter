<template>
  <div>
    <div class="uploadImageBox" :style="{width: imgWidth, height: imgHeight, borderRadius: radius}" :class="{'is-disabled': disabledStatus}">
      <!--上传成功-->
      <template v-if="imgUrl">
        <span class="uploadTitle" v-if="title">
          <i class="el-icon-picture-outline"></i> {{title}}
        </span>
        <!--<img :src="imgUrl" class="uploadImg">-->
        <div :style="
          'width: 100%;' +
          'height: 100%;' +
          'position: absolute;' +
          'left: 0;' +
          'top: 0;' +
          'z-index: 1;' +
          'background-image: url(' + imgUrl + ');' +
          'background-size: cover;' +
          'background-position: center center;'
        "></div>
        <div class="layer animated fadeIn">
          <div class="layer-wrap">
            <!--<span class="title" v-if="!disabledStatus">{{ title }}</span>-->
            <i class="el-icon-zoom-in btn" @click="zoomImg"></i>
            <i class="el-icon-delete btn" @click="delUploadImage" v-if="!disabledStatus"></i>
          </div>
        </div>
        <el-dialog
          class="uploadImageTiny"
          :visible.sync="opened.status"
          :width="opened.width"
          append-to-body>
          <img :src="imgUrl">
        </el-dialog>
      </template>
      <!--未上传状态-->
      <template v-else>
        <el-upload
          v-loading="loading"
          element-loading-background="#f0f3fb"
          class="uploader"
          accept="image/*"
          :action="apiUrl"
          :disabled="disabledStatus"
          :data="{type: imgType}"
          :auto-upload="true"
          :show-file-list="false"
          :http-request="uploadImageRequest"
          :before-upload="beforeUpload">
          <span class="btn" :class="{btn_title: (title && typeof title !== 'undefined')}">
            <i :class="uploadIcon"></i> {{ title }}
          </span>
        </el-upload>
      </template>
    </div>
  </div>
</template>

<script>
import { uploadFile, deleteFile } from '@/api/public'
export default {
  name: 'uploadImg',
  props: ['fieldName', 'imgType', 'imgSrc', 'imgTitle', 'width', 'height', 'disabled', 'icon', 'radius', 'dialogStatus'],
  data () {
    return {
      apiUrl: 'null',
      imgUrl: this.imgSrc || '',
      title: this.imgTitle || '',
      imgWidth: this.width || '100%',
      imgHeight: this.height || '180px',
      disabledStatus: this.disabled || false,
      uploadIcon: this.icon || 'el-icon-plus',
      opened: {
        status: false,
        width: '50%',
        height: 'auto'
      },
      loading: false
    }
  },
  methods: {
    // 上传图片条件
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) this.$message.error('上传图片大小不能超过 2MB!')
      return isLt2M
    },
    // 删除上传图片
    delUploadImage () {
      deleteFile(this.imgUrl).then(() => {
        this.imgUrl = ''
        this.$message.success({message: '图片删除成功', duration: 1500}) // 弹出成功提示
      })
    },
    // 上传图片
    uploadImageRequest (e) {
      const form = new FormData()
      form.append('type', this.imgType)
      form.append('file', e.file)
      this.loading = true
      uploadFile(form).then(res => {
        this.imgUrl = res.data.result.filePath
        this.$message.success({message: '图片上传成功', duration: 1500}) // 弹出成功提示
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 放大图片
    zoomImg () {
      let img = new Image()
      img.src = this.imgUrl
      if (img.width > 700) {
        this.opened.width = '700px'
      } else {
        this.opened.width = img.width + 'px'
        this.opened.height = img.height + 'px'
      }
      this.opened.status = !this.opened.status
    }
  },
  watch: {
    imgSrc (val) {
      this.imgUrl = val
    },
    imgUrl (val) {
      this.$emit('upload-img', {fieldName: this.fieldName, url: val})
    },
    disabled (val) {
      this.disabledStatus = val
    },
    dialogStatus (val) {
      if (!val) {
        this.imgUrl = ''
      }
    }
  }
}
</script>

<style lang="scss">
.uploadImageBox {
  width: 100%;
  height: 180px;
  margin: 0 auto;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  font-size: 25px;
  overflow: hidden;
  position: relative;
  background-color: #f5f7fa;
  &:hover {
    border-color: #409EFF;
    background-color: #f0f3fb;
    .layer {
      display: block;
    }
    .uploadTitle {
      display: none;
    }
  }
  /*.uploadTitle {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*font-size: 14px;*/
    /*color: #409EFF;*/
    /*background-color: rgba(116, 185, 255, 0.3);*/
    /*padding: 0 10px;*/
    /*line-height: 1.5em;*/
    /*border-radius: 0 0 4px 0;*/
    /*border: 1px dashed #b3d8ff;*/
    /*border-top: 0;*/
    /*border-left: 0;*/
    /*z-index: 99999;*/
  /*}*/
  .uploadImg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .layer {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, .65);
    .layer-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .btn {
        color: #fff;
        margin: 0 10px;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }
  .uploadTitle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.65);
    color: #fff;
    font-size: 12px;
    line-height: 2em;
    padding: 0 10px;
    border-radius: 20px;
    white-space: nowrap;
    z-index: 2;
  }
  .uploader {
    width: 100%;
    height: 100%;
    text-align: center;
    .el-upload {
      display: flex;
      width: 100%;
      height: 100%;
      cursor: pointer;
      color: #888;
      .btn {
        margin: auto;
      }
      .btn_title {
        font-size: 12px;
        white-space: nowrap;
      }
      &:hover {
        color: #409EFF;
      }
    }
  }
}
.uploadImageTiny {
  .el-dialog {
    border-radius: 4px;
  }
  .el-dialog__header {
    height: 0;
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .el-dialog__headerbtn {
    background-color: #353535;
    border-radius: 50%;
    padding: 3px;
    border: 2px solid #fff;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    .el-dialog__close {
      display: block;
      font-size: 12px;
      color: #fff;
    }
  }
}
.is-error {
  .uploadImageBox {
    border-color: #fa5555;
  }
}
.is-success {
  .uploadImageBox {
    border-color: #67c23a;
  }
}
.is-disabled {
  border-color: #d8dce5;
  color: #999;
  &:hover {
    border-color: #d8dce5;
    background-color: #fff;
  }
  .uploader {
    .el-upload {
      cursor: not-allowed;
      &:hover {
        color: #999;
      }
    }
  }
}
</style>
