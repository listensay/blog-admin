<script setup>
import { ref, watch } from 'vue'
import Markdown from '@/components/Markdown/index.vue'
import { message } from 'ant-design-vue'
import usePostStore from '@/stores/module/post'
import { useRouter } from 'vue-router'
import useCategoryStore from '@/stores/module/category'
import { storeToRefs } from 'pinia'

const postStore = usePostStore()
const router = useRouter()

// Props
const props = defineProps({
  edit: { type: Object, default: () => ({ state: false }) }
})

const categoryStore = useCategoryStore()
categoryStore.fetchGetCategory()

const { category } = storeToRefs(categoryStore)

const title = ref('')
const formState = ref({})

const category_value = ref(1)
const getArticleContent = async post_id => {
  try {
    await postStore.fetchContentPost(post_id).then(result => {
      formState.value.title = result.data.list[0].title
      formState.value.content = result.data.list[0].content
      category_value.value = result.data.list[0].category_id
    })
  } catch (error) {
    console.log(error)
  }
}

if (props.edit.post_id) {
  getArticleContent(props.edit.post_id)
}

// Markdown
const markdownRef = ref('')

const formRef = ref()

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
        try {
          await postStore
            .fetchEditPost({
              post_id: props.edit.post_id,
              title: formState.value.title,
              content: markdownRef.value.getContent(),
              category_id: category_value.value
            })
            .then((res) => {
              if (res.success) {
                message.success('文章更新成功')
                router.push({ path: '/article-management/article-list' })
              } else {
                message.error(res.message)
              }
            })
        } catch (error) {
          message.error(error)
        }
      } else {
        await postStore
          .fetchAddPost({
            title: formState.value.title,
            content: markdownRef.value.getContent(),
            category_id: category_value.value
          })
          .then((res) => {
            if (res.success) {
              message.success('文章添加成功 🎉')
              router.push({ path: '/article-management/article-list' })
              formRef.value.resetFields()
            } else {
              message.error(res.message)
            }
          })
      }
    })
    .catch(() => {
      console.log(category_value)
      message.info('请检查内容哦 (*╹▽╹*)')
    })
}

const options = ref([])

watch(category, () => {
  if (Array.isArray(category.value)) {
    category.value.forEach(item => {
      options.value.push({ value: item.category_id, label: item.category_name })
    })
  }
})

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>

<template>
  <div class="layout-margin">
    <a-card>
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item ref="title" label="文章标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item ref="category" label="文章分类" name="category">
          <a-select
            v-model:value="category_value"
            show-search
            placeholder="Select a person"
            style="width: 200px"
            :options="options"
            :filter-option="filterOption"
          />
        </a-form-item>

        <a-form-item>
          <markdown ref="markdownRef" :content="formState.content" height="600" />
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
