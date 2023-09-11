<script setup>
import { computed, reactive, toRef } from 'vue'
import usePostStore from '@/stores/module/post'
const postStore = usePostStore()
postStore.fetchListPost()

const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '作者',
    dataIndex: 'user_id'
  },
  {
    title: '操作'
  }
]
const data = computed(() => postStore.list)

const state = reactive({
  selectedRowKeys: []
})

const onSelectChange = (selectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
  state.selectedRowKeys = selectedRowKeys
}
</script>

<template>
  <div class="article-list layout-margin">
    <a-card title="文章列表">
      <div>
        <a-table
          :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data"
        />
      </div>
    </a-card>
  </div>
</template>

<style lang="less" scoped></style>
