import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useDefaultStore = defineStore('default', () => {

  const tempSignedFlag = ref(false)

  function switchTempSignedFlag() {
    tempSignedFlag.value = !tempSignedFlag.value
  }

  return { tempSignedFlag, switchTempSignedFlag }
})
