import { defineStore } from 'pinia'
import { useImagesAPI } from '@/api/images'
import { message } from 'ant-design-vue'
const imagesAPI = useImagesAPI()

const useImagesStore = defineStore('useImagesStore', {
  state: () => ({
    images: []
  }),
  actions: {
    async fetchGetImages() {
      try {
        const result = await imagesAPI.getImages()
        this.images = result.data.list
      } catch (error) {
        message.error(1, error)
        console.log(error)
      }
    },
    async fetchDeleteImages(filename) {
      try {
        const result = await imagesAPI.deleteImages(filename)
        this.fetchGetImages(filename)
        message.success(result.message)
      } catch (error) {
        console.log(12, error)
        message.error(error)
      }
    }
  }
})

export default useImagesStore
