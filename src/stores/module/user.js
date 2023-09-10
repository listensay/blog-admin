import { defineStore } from "pinia";

const useUserStore = defineStore('useUser', {
  state: () => ({
    token: '',
  })
})

export default useUserStore
