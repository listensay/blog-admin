import request from '@/utils/request'

export const useCategoryAPI = () => {
  return {
    category: () => {
      return request({ url: '/category/list' })
    },
    editCategory: (data) => {
      return request({ url: '/category/editCategory', method: 'post', data })
    },
    addCategory: (data) => {
      return request({ url: '/category/addCategory', method: 'post', data })
    },
    deleteCategory: (id) => {
      return request({ url: `/category/deleteCategory/${id}`, method: 'delete' })
    }
  }
}
