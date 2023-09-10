<script setup>
import { reactive, ref } from 'vue';
import { userApi } from '@/api/user.js'
import { message } from 'ant-design-vue';

const formRef = ref();

// 表单
const formState = reactive({
  username: '',
  password: ''
})

// 表单验证
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change',
    },
    {
      min: 5,
      message: '用户名长度不少于5',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      min: 5,
      message: '密码长度不少于5',
      trigger: 'blur',
    }
  ]
}

// 登陆处理
const  loginHandle = () => {
  formRef.value.validate().then(async () => {

    try {
      const { data: result } = await userApi().login({ ...formState })

      if(result.code === 2000) {
        message.success(result.message)
      } else {
        message.error(result.message)
      }

      formRef.value.resetFields()
    } catch (error) {
      console.log(error)
    }

  }).catch(error => {
    message.info('请检查输入的内容');
  });
}
</script>

<template>
  <div class="login">
    <h2>login</h2>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
    >
      <a-form-item
        label="用户名"
        name="username"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
      >
        <a-input v-model:value="formState.password" type="password"/>
      </a-form-item>
    </a-form>
    <a-button @click="loginHandle">登陆</a-button>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
}
</style>
