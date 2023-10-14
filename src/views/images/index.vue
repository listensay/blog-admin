<script setup>
import { inject, ref, onMounted } from 'vue'
import useImagesStore from '@/stores/module/images'
import { storeToRefs } from 'pinia'

const imagesStore = useImagesStore()
const { images } = storeToRefs(imagesStore)

const baseurl = ref(inject('$baseurl'))

const confirm = (filename) => {
  imagesStore.fetchDeleteImages(filename)
}

onMounted(async () => {
  await imagesStore.fetchGetImages()
})
</script>

<template>
  <div class="images layout-margin">
    <a-card title="图片管理">
      <ul v-if="images.length != 0" class="list">
        <li v-for="image in images" :key="image.name" class="item">
          <a-card hoverable>
            <template #cover>
              <img alt="example" :src="baseurl + image.url">
            </template>
            <a-card-meta :title="image.filename">
              <template #description>
                <a-popconfirm
                  title="是否确定删除图片"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="confirm(image.filename)"
                >
                  <a-button type="primary" danger>删除</a-button>
                </a-popconfirm>
              </template>
            </a-card-meta>
          </a-card>
        </li>
      </ul>
      <a-empty v-else />
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.images {
  .list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 10px -20px;
    .item {
      width: calc(25% - 40px);
      margin: 10px 20px;
      .photo {
        height: 170px;
        img {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .action {
        padding: 10px;
      }
    }
  }
}
</style>
