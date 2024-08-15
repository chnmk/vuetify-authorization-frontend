import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useDefaultStore = defineStore('default', () => {

  const tempSignedFlag = ref(false)
  const storedJWT = ref('')

  function switchTempSignedFlag() {
    tempSignedFlag.value = !tempSignedFlag.value
  }

  function setStoredJwtValue(value: string) {
    storedJWT.value = value
  }

  return { tempSignedFlag, switchTempSignedFlag, storedJWT, setStoredJwtValue }
})
