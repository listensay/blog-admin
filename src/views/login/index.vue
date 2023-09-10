<script setup>
import { reactive, ref } from 'vue';
import { userApi } from '@/api/user'
import { message } from 'ant-design-vue';
import useUserStore from '@/stores/module/user'

const useUser = useUserStore()

const formRef = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 24 };

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
        useUser.token = result.data
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
<div class="login-layout">
  <div class="left">
    <img src="@/assets/login.jpg">
  </div>
  <div class="login">
    <div class="container">
      <h1>后台管理系统</h1>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
      >
        <a-form-item
          label="Username"
          name="username"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="Password"
          name="password"
        >
          <a-input v-model:value="formState.password" type="password"/>
        </a-form-item>
      </a-form>
      <a-button @click="loginHandle" type="primary" size="large">登陆</a-button>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
.login-layout {
  display: flex;
  justify-content: space-between;
  height: 100vh;
  .left {
    flex: 1;
    background-color: brown;
    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .login {
    width: 600px;
    padding: 40px;
    border-left: 1px solid #eee;
    display: flex;
    align-items: center;
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 80%;
      margin: 0 auto;
      h1 {
        margin-bottom: 40px;
        text-align: center;
      }
    }
  }
}
</style>
