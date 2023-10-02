<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const changeMenuRouter = (to) => {
  router.push({ path: to })
}

const menuList = route.matched[0].children

const selectedKeys = ref([])

menuList.forEach(element => {
  if (element.children) {
    const result = element.children.find(item => {
      return item.path === route.path
    })

    if (result) {
      selectedKeys.value[0] = route.path
    }
    console.log(result)
  } else if (element.path === route.path) {
    selectedKeys.value[0] = route.path
  }
})

watch(router.currentRoute, newRoute => {
  selectedKeys.value[0] = newRoute.path
})

const openKeys = ref(['/article-management'])
</script>

<template>
  <div class="sider-menu">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
    >
      <template v-for="item in menuList">
        <a-menu-item
          v-if="!item.children && !item.meta.hiding"
          :key="item.path"
          @click="changeMenuRouter(item.path)"
        >
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu
          v-else-if="!item.meta.hiding"
          :key="item.path"
        >
          <template #title>
            <span>
              <span>{{ item.meta.title }}</span>
            </span>
          </template>
          <template
            v-for="navChildren in item.children"
            :key="navChildren.path"
          >
            <a-menu-item
              v-if="!navChildren.meta.hiding"
              :key="navChildren.path"
              @click="changeMenuRouter(navChildren.path)"
            >
              {{ navChildren.meta.title }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.sider-menu {
  padding: 10px 15px;
  border-right: 1px solid #eee;
}
:where(.css-dev-only-do-not-override-kqecok).ant-menu-light.ant-menu-root.ant-menu-inline {
  border-inline-end: none;
}
</style>
