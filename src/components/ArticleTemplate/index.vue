<script setup>
import { ref, watch, inject } from 'vue'
import Markdown from '@/components/Markdown/index.vue'
import { message } from 'ant-design-vue'
import usePostStore from '@/stores/module/post'
import { useRouter } from 'vue-router'
import useCategoryStore from '@/stores/module/category'
import { storeToRefs } from 'pinia'
import { PlusOutlined } from '@ant-design/icons-vue'

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
      imageUrl.value = result.data.list[0].cover
      description.value = result.data.list[0].description
      style.value = result.data.list[0].style
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
              category_id: category_value.value,
              cover: imageUrl.value,
              description: description.value,
              style: style.value
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

// Drawer

const open = ref(false)
const showDrawer = () => {
  open.value = true
}
const onClose = () => {
  open.value = false
}

// img
const fileList = ref([])
const loading = ref(false)
const imageUrl = ref('')
const description = ref('')
const style = ref('')

const handleChange = info => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }

  if (info.file.status === 'done') {
    // Get this url from response in real world.
    imageUrl.value = info.file.response.data.img
    loading.value = false
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const baseurl = ref(inject('$baseurl'))
</script>

<template>
  <div class="layout-margin">
    <a-card>
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item ref="title" label="文章标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item>
          <markdown ref="markdownRef" :content="formState.content" height="600" />
        </a-form-item>
        <a-form-item>
          <a-button style="margin-right: 10px" @click="onSubmit">草稿</a-button>
          <a-button type="primary" @click="showDrawer">
            {{
              props.edit.state ? '更新编辑' : '发布'
            }}
          </a-button>
        </a-form-item>
      </a-form>

      <a-drawer
        :title="props.edit.state ? '编辑文章' : '发布文章'"
        :width="720"
        :open="open"
        :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }"
        @close="onClose"
      >
        <div>
          <a-form
            layout="vertical"
            :model="formState"
          >
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
            <a-from-item label="文章组件风格">
              <a-radio-group v-model:value="style" button-style="solid">
                <a-radio-button :value="1">文章有缩略图风格</a-radio-button>
                <a-radio-button :value="2">社交动态风格</a-radio-button>
                <a-radio-button :value="3">文章无缩略图风格</a-radio-button>
              </a-radio-group>
            </a-from-item>
            <a-form-item ref="category" label="文章封面" name="cover">
              <a-upload
                v-model:file-list="fileList"
                name="img"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="baseurl + '/api/upload/images'"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="baseurl + imageUrl" alt="avatar" width="100">
                <div v-else>
                  <loading-outlined v-if="loading" />
                  <plus-outlined v-else />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="文章摘要">
              <a-textarea v-model:value="description" :rows="3" />
            </a-form-item>
          </a-form>
        </div>
        <template #extra>
          <a-space>
            <a-button @click="onClose">取消</a-button>
            <a-button type="primary" @click="onSubmit">确认</a-button>
          </a-space>
        </template>
      </a-drawer>
    </a-card>
  </div>
</template>

<style lang="less">
.avatar-uploader {
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
