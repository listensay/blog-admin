<template>
  <div class="markdown-container">
    <div id="markdown-box" />
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { defineProps, onMounted, defineExpose, computed, watch } from 'vue'

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
    language: 'zh-CN'
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
