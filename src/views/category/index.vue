<script setup>
import useCategoryStore from '@/stores/module/category'
import { storeToRefs } from 'pinia'
import CategoryMoadal from './components/CategoryMoadal.vue'

import { ref } from 'vue'
import { message } from 'ant-design-vue'
const categoryStore = useCategoryStore()
categoryStore.fetchGetCategory()
const { category } = storeToRefs(categoryStore)

const columns = [
  {
    title: '分类标题',
    dataIndex: 'category_name'
  },
  {
    title: '分类描述',
    dataIndex: 'category_desc'
  },
  {
    title: '分类头像',
    dataIndex: 'category_img'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center'
  }
]

const categoryMoadalState = ref(0)

const open = ref(false)

const currentRow = ref({})

const showModal = (record, state) => {
  console.log(state)
  if (state === 0) {
    currentRow.value = record
    categoryMoadalState.value = 0
    open.value = true
  } else if (state === 1) {
    categoryMoadalState.value = 1
    open.value = true
  }
}

const handleClose = () => {
  open.value = false
  currentRow.value = {}
}

const deleteHandle = async (id) => {
  const result = await categoryStore.fetchDeleteCategory(id)
  if (result.code === 2000) {
    message.success(result.message)
  }
}
</script>

<template>
  <div class="layout-margin">
    <a-card title="文章分类">
      <template #extra><a href="#" @click="showModal({}, 1)">添加分类</a></template>
      <a-table :data-source="category" :columns="columns" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'title'">
            <a-button type="link" style="padding: 0" @click="editArticle(record)">{{ text }}</a-button>
          </template>
          <!-- 创建日期 -->
          <template v-if="column.dataIndex === 'category_img'">
            <a-avatar :src="record.category_img" shape="square" :size="70" />
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="showModal(record, 0)">编辑</a-button>
            <a-popconfirm
              :title="`是否确定删除 &quot;${record.category_name}&quot;`"
              ok-text="是"
              cancel-text="否"
              placement="left"
              @confirm="deleteHandle(record.category_id)"
            >
              <a-button type="link" danger style="padding: 0">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
    <CategoryMoadal :open="open" :current-row="currentRow" :state="categoryMoadalState" @close="handleClose" />
  </div>
</template>

<style lang="less" scoped>

</style>
