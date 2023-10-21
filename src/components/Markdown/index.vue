<template>
  <div class="markdown-container">
    <div id="markdown-box" />
  </div>
</template>

<script setup>
import '@toast-ui/editor/dist/toastui-editor.css'
import MKEditor from '@toast-ui/editor'
import { defineProps, onMounted, defineExpose, computed, watch, ref, inject } from 'vue'
import axios from 'axios'

const baseurl = ref(inject('$baseurl'))

const props = defineProps({
  content: { type: String, default: '' },
  height: { type: String, default: '500' }
})

const content = computed(() => props.content)

let mkEditor
let el

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initMkeditor()
})

const initMkeditor = () => {
  mkEditor = new MKEditor({
    el,
    height: `${props.height}px`,
    previewStyle: 'vertical',
    language: 'zh-CN',
    hooks: {
      addImageBlobHook: async (blob, callback) => {
        const formData = new FormData()
        formData.append('img', blob)
        // 这里打印出是空对象
        console.log(formData)
        // 替换为您的图片上传API
        const result = await axios({
          url: baseurl.value + '/api/upload/images',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const imgUrl = ref(baseurl.value + result.data.data.img)

        callback(imgUrl.value, 'alt text')

        // 阻止默认的图片上传
        return false
      }
    }
  })

  // 数据回显
  if (content.value) {
    mkEditor.setHTML(content.value)
  }
}

watch(content, () => {
  initMkeditor()
})

const getContent = () => {
  return mkEditor.getHTML()
}

defineExpose({ getContent })
</script>

<style>
.markdown-container {
  background-color: #fff;
}
</style>
