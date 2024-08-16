import { ref } from 'vue';
import { defineStore } from 'pinia'
import jwt from 'jsonwebtoken';

export const useDefaultStore = defineStore('default', () => {

  const tempSignedFlag = ref(false)
  const storedJWT = ref('')
  const username = ref('')
  const group = ref('')

  function switchTempSignedFlag() {
    tempSignedFlag.value = !tempSignedFlag.value
  }

  function setStoredJwtValue(value: string) {
    storedJWT.value = value
  }

  function setUsername(value: string) {
    username.value = value
  }

  function setGroup(value: string) {
    group.value = value
  }

  return { 
    tempSignedFlag, 
    switchTempSignedFlag, 
    storedJWT, 
    setStoredJwtValue, 
    username, 
    setUsername,
    group,
    setGroup
  }
})
