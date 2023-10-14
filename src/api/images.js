import request from '@/utils/request'

export const useImagesAPI = () => {
  return {
    getImages: () => {
      return request({
        url: '/upload/images',
        method: 'get'
      })
    },
    deleteImages: (filename) => {
      return request({
        url: `/upload/images/${filename}`,
        method: 'delete'
      })
    }
  }
}
