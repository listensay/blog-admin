<script setup>
import { ref, onMounted } from 'vue'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
import useUserStore from '@/stores/module/user'

const userStore = useUserStore()
userStore.fetchUserProfile()

const formRef = ref()

const dynamicValidateForm = ref({
  profile: []
})

const removeUser = item => {
  const index = dynamicValidateForm.value.profile.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.value.profile.splice(index, 1)
  }
}

const addUser = () => {
  dynamicValidateForm.value.profile.push({
    first: '',
    last: '',
    icon: '',
    id: Date.now()
  })
}

const onFinish = async (values) => {
  await userStore.fetchSetUserProfile({ profiles: JSON.stringify(values) })
}

onMounted(async () => {
  await userStore.fetchUserProfile()
  dynamicValidateForm.value = userStore.userProfile
})
</script>

<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(user, index) in dynamicValidateForm.profile"
      :key="user.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['profile', index, 'icon']"
        :rules="{
          required: true,
          message: 'Missing first name',
        }"
      >
        <a-input v-model:value="user.icon" placeholder="图标" />
      </a-form-item>
      <a-form-item
        :name="['profile', index, 'first']"
        :rules="{
          required: true,
          message: 'Missing first name',
        }"
      >
        <a-input v-model:value="user.first" placeholder="比如: 爱好" />
      </a-form-item>
      <a-form-item
        :name="['profile', index, 'last']"
        :rules="{
          required: true,
          message: 'Missing last name',
        }"
      >
        <a-input v-model:value="user.last" placeholder="比如: 篮球" />
      </a-form-item>
      <MinusCircleOutlined @click="removeUser(user)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addUser">
        <PlusOutlined />
        添加字段
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>
