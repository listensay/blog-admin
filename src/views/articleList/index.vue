<script setup>
import { computed, reactive } from 'vue'
import { CaretDownOutlined, DeleteFilled, EyeInvisibleFilled } from '@ant-design/icons-vue'

import usePostStore from '@/stores/module/post'
import { message } from 'ant-design-vue'
const postStore = usePostStore()
postStore.fetchListPost()

const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '作者',
    dataIndex: 'username'
  },
  {
    width: 200,
    align: 'center',
    title: '日期',
    dataIndex: 'create_date'
  },
  {
    width: 100,
    title: '操作',
    key: 'action',
    align: 'center'
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

const confirm = async (post_id) => {
  try {
    await postStore.fetchDeletePost(post_id).then(async (result) => {
      if (result.success) {
        await postStore.fetchListPost()
        message.success('删除成功')
      } else {
        message.error(result.message)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="article-list layout-margin">
    <a-card title="文章列表">
      <div>
        <a-table
          rowKey="post_id"
          :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data || null"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'title'">
              <a-button type="link" style="padding: 0">{{ text }}</a-button>
            </template>
            <template v-if="column.key === 'action'">
              <a-popconfirm
                :title="`是否确定删除《${record.title}》这个文章`"
                ok-text="是"
                cancel-text="否"
                @confirm="confirm(record.post_id)"
                placement="left"
              >
                <a-button type="link" danger style="padding: 0">删除</a-button>
              </a-popconfirm>
            </template>
          </template>
          <template #footer>
            <a-dropdown>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1">
                    <DeleteFilled />
                    删除
                  </a-menu-item>
                  <a-menu-item key="2">
                    <EyeInvisibleFilled />
                    设置不可见
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                操作
                <CaretDownOutlined />
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<style lang="less" scoped></style>
