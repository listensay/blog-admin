<script setup>
import ArticleTemplate from '@/components/ArticleTemplate/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="layout-margin">
    <ArticleTemplate :edit="{ state: true, post_id: route.query.post_id }" />
  </div>
</template>
