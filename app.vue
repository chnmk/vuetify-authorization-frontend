<template>
  <v-app id="app">
    <v-card class="mx-auto my-auto" width="300" v-if="!store.tempSignedFlag">
      <v-tabs class="ma-4" v-model="tab" align-tabs="center">
        <v-tab value="signin">Sign In</v-tab>
        <v-tab value="signup">Sign Up</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="signin">     
          <SignInForm />
        </v-tabs-window-item>
        <v-tabs-window-item value="signup">
          <SignUpForm />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
    <v-card class="mx-auto my-auto" width="300" v-if="store.tempSignedFlag">
      <ButtonsField />
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useDefaultStore } from './stores/defaultStore';
import SignInForm from './components/SignInForm.vue';
import SignUpForm from './components/SignUpForm.vue';
import ButtonsField from './components/ButtonsField.vue';

const store = useDefaultStore()
const tab = ref(null)
</script>
