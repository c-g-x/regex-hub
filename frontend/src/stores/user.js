import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { _id: null }
  },
  getters: {
    userId: (state) => state._id,
  },
  // could also be defined as
  actions: {
    login(_id) {
      this.$patch({ _id })
    },

    logout() {
      this.$patch({ _id: null })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
