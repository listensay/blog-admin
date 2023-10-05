<script setup>
import { defineProps, defineEmits, ref, toRaw, reactive, onMounted, watch, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'

import useCategoryStore from '@/stores/module/category'
const categoryStore = useCategoryStore()

const props = defineProps({
  open: { type: Boolean, default: false },
  currentRow: { type: Object, default: () => ({}) },
  // 0 编辑 1 修改
  state: { type: Number, default: 0 }
})

const emit = defineEmits(['close'])

const close = () => {
  formRef.value.resetFields()
  imageUrl.value = ''
  emit('close')
}

const handleOk = e => {
  formRef.value.resetFields()
  imageUrl.value = ''
  emit('close')
}

const formRef = ref()
const labelCol = {
  span: 6
}
const wrapperCol = {
  span: 24
}

const formState = reactive({
  category_name: '',
  category_desc: ''
})

const rules = {
  category_name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'change'
    }
  ],
  category_desc: [
    {
      required: true,
      message: '请输入分类描述'
    }
  ]
}

const imageUrl = ref('')
const cState = ref('')

onMounted(() => {
  // 在组件初始化完成后获取currentRow的值
  formState.category_name = props.currentRow.category_name
  formState.category_desc = props.currentRow.category_desc
  imageUrl.value = props.currentRow.category_img
  cState.value = props.state
})

watch(() => props.currentRow, (newRow) => {
  // 当currentRow发生变化时更新formState
  formState.category_name = newRow.category_name
  formState.category_desc = newRow.category_desc
  imageUrl.value = props.currentRow.category_img
})

// 当我父组件修改 props.state 的值后 这里没有发生变化
watchEffect(() => {
  cState.value = props.state
})

const fileList = ref([])
const loading = ref(false)

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

const handleChangeImageUrl = (info) => {
  console.log(info)
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

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (props.state === 0) {
        const result = await categoryStore.fetchEditCategory({ ...toRaw(formState), category_id: props.currentRow.category_id, category_img: imageUrl.value })
        if (result.code === 2000) {
          message.success(result.message)
        }
      } else if (props.state === 1) {
        const result = await categoryStore.fetchAddCategory({ ...toRaw(formState), category_img: imageUrl.value })
        if (result.code === 2000) {
          message.success(result.message)
        }
      }
      handleOk()
    })
    .catch(error => {
      console.log('error', error)
    })
}

</script>

<template>
  <div class="home">
    <a-modal
      :open="props.open"
      :title="cState === 0 ? '编辑分类' : '添加分类'"
      @ok="handleOk"
      @cancel="close"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item ref="category_name" label="分类名称" name="category_name">
          <a-input v-model:value="formState.category_name" />
        </a-form-item>
        <a-form-item ref="category_desc" label="分类描述" name="category_desc">
          <a-input v-model:value="formState.category_desc" />
        </a-form-item>
        <a-form-item label="分类头像" name="avatar">
          <a-upload
            v-model:file-list="fileList"
            name="img"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http://127.0.0.1:3000/api/images/avatar"
            :before-upload="beforeUpload"
            @change="handleChangeImageUrl"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100">
            <div v-else>
              <loading-outlined v-if="loading" />
              <plus-outlined v-else />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="submit" type="primary" @click="onSubmit">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>

</style>
