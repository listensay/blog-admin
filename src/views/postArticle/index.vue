<script setup>
import { ref, reactive } from 'vue'
import Markdown from '@/components/Markdown/index.vue'
import { message } from 'ant-design-vue';

const content = ref('')
const markdownRef = ref(null)

const formRef = ref();
const formState = reactive({
  title: '',
});
const rules = {
  title: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'change',
    },
  ]
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log(markdownRef.value.getContent())
    })
    .catch(error => {
      message.info('请检查内容哦 (*╹▽╹*)')
    });
};
</script>

<template>
  <div class="layout-margin">
    <a-card>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
      >
        <a-form-item ref="title" label="文章标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item>
          <markdown v-model="content" ref="markdownRef" height="500"/>
        </a-form-item>
        <a-form-item>
          <a-button @click="onSubmit">草稿</a-button>
          <a-button @click="onSubmit" type="primary">发布</a-button>
        </a-form-item>

      </a-form>
    </a-card>
  </div>
</template>

