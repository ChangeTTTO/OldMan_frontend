import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore(
    'LoginStatus',
    () => {
      const LoginStatus = ref(false)
      return { LoginStatus }
    },
    {
      persist: true,
    },
)

