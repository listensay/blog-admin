<script setup>
import { ref, reactive, computed } from 'vue'
import Markdown from '@/components/Markdown/index.vue'
import { message } from 'ant-design-vue'
import usePostStore from '@/stores/module/post'
import { useRouter } from 'vue-router'
const postStore = usePostStore()
const router = useRouter()

// Props
const props = defineProps({
  edit: { type: Object, default: () => ({ state: false }) }
})

if (props.edit.post_id) {
  postStore.fetchContentPost(props.edit.post_id)
}

const title = computed(() => postStore.currentArticle.title)

// Markdown
const content = computed(() => postStore.currentArticle.content)
const markdownRef = ref('')

const formRef = ref()
const formState = reactive({
  title
})

const rules = {
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'change'
    }
  ]
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (props.edit.state) {
        await postStore
          .fetchEditPost({
            post_id: props.edit.post_id,
            title: formState.title,
            content: markdownRef.value.getContent()
          })
          .then((res) => {
            if (res.message) {
              message.success('文章更新成功')
              router.push({ path: '/articleList' })
            } else {
              message.error(res.message)
            }
          })
      } else {
        await postStore
          .fetchAddPost({ title: formState.title, content: markdownRef.value.getContent() })
          .then((res) => {
            if (res.success) {
              message.success('文章添加成功 🎉')
              router.push({ path: '/articleList' })
              formRef.value.resetFields()
            } else {
              message.error(res.message)
            }
          })
      }
    })
    .catch((error) => {
      console.log(error)
      message.info('请检查内容哦 (*╹▽╹*)')
    })
}
</script>

<template>
  <div class="layout-margin">
    <a-card>
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item ref="title" label="文章标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item>
          <markdown ref="markdownRef" :content="content" height="600" />
        </a-form-item>
        <a-form-item>
          <a-button style="margin-right: 10px" @click="onSubmit">草稿</a-button>
          <a-button type="primary" @click="onSubmit">
            {{
              props.edit.state ? '更新' : '发布'
            }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
