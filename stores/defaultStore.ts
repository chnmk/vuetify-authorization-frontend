import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useDefaultStore = defineStore('default', () => {

  const signed = ref(false)
  const storedJWT = ref('')
  const username = ref('')
  const group = ref('')

  function switchSigned() {
    signed.value = !signed.value
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
    signed, 
    switchSigned, 
    storedJWT, 
    setStoredJwtValue, 
    username, 
    setUsername,
    group,
    setGroup
  }

})
