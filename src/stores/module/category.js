import { defineStore } from 'pinia'
import { useCategoryAPI } from '../../api/category'
const categoryAPI = useCategoryAPI()

const useCategoryStore = defineStore('useCategoryStore', {
  state: () => ({
    category: []
  }),
  actions: {
    async fetchGetCategory() {
      try {
        const result = await categoryAPI.category()
        this.category = result.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchEditCategory(data) {
      try {
        const result = await categoryAPI.editCategory(data)
        this.fetchGetCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    },
    async fetchAddCategory(data) {
      try {
        const result = await categoryAPI.addCategory(data)
        this.fetchGetCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    },
    async fetchDeleteCategory(id) {
      try {
        const result = await categoryAPI.deleteCategory(id)
        this.fetchGetCategory()
        return result
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default useCategoryStore
