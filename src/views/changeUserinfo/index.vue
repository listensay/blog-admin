<script setup>
import { ref, reactive, toRefs, computed } from 'vue';
import { message } from 'ant-design-vue';
import { LoadingOutlined,PlusOutlined } from '@ant-design/icons-vue';
import useUserStore from '../../stores/module/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { userinfo } = storeToRefs(userStore)

const nickname = ref(userinfo.value.nickname)
const email = ref(userinfo.value.email)

const formRef = ref();

const formState = reactive({
  nickname: userStore.userinfo.nickname,
  email: userStore.userinfo.email
});

const rules = {
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'change',
    },
    {
      min: 2,
      max: 8,
      message: '长度2到8',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'change',
    },
    {
      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      message: '邮箱格式不正确',
    },
    {
      max: 50,
      message: '邮箱不得超过50字符',
    },
  ],
};

const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref(userStore.userinfo.avatar);

const handleChange = info => {
  console.log(info)
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }

  if (info.file.status === 'done') {
    // Get this url from response in real world.
    imageUrl.value = info.file.response.data.img;
    loading.value = false;
  }

  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      await userStore.fetchChangeUserinfo({ avatar: imageUrl.value, ...formState }).then(result => {
        if(result) {
          message.success('修改成功!')
        }
      })
    })
    .catch(error => {
      console.log('error', error);
    });
};

</script>

<template>
  <div class="changeUserinfo layout-margin">
      <a-card title="修改资料" style="width: 700px; margin: 0 auto;">
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
        >
          <a-form-item ref="avatar" name="avatar">
            <a-upload
              v-model:file-list="fileList"
              name="img"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="http://127.0.0.1:3000/api/images/avatar"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100"/>
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item ref="nickname" label="昵称" name="nickname">
            <a-input v-model:value="formState.nickname" />
          </a-form-item>
          <a-form-item ref="email" label="邮箱" name="email">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSubmit">修改</a-button>
          </a-form-item>
        </a-form>
      </a-card>
  </div>
</template>

<style lang="less" scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.avatar-uploader > .ant-upload > img{
  max-width: 100%;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>