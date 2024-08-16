<template>
  <h2 class="d-flex justify-center mt-2">
    {{ store.username }}
  </h2>
  <h3 class="d-flex justify-center mb-2">
    {{ store.group }}
  </h3>
  <div class="d-flex justify-center">
    <v-btn class="ma-2" width="150" @click="anyone">
      Anyone
    </v-btn>
  </div>
  <div class="d-flex justify-center">
    <v-btn class="ma-2" width="150" @click="groupA">
      Group A
    </v-btn>
  </div>
  <div class="d-flex justify-center">
    <v-btn class="ma-2" width="150" @click="groupB">
      Group B
    </v-btn>
  </div>
  <div class="d-flex justify-center">
    <v-btn class="ma-2" width="150" @click="secret">
      Secret
    </v-btn>
  </div>
</template>

<script setup>
import { useDefaultStore } from '#imports';
import jwt from 'jsonwebtoken';

const store = useDefaultStore()

function anyone() {
  alert("Success!")
}

function groupA() {
  const decoded = jwt.decode(store.storedJWT)
  if (decoded.group === "Group A") {
    alert("Success!")
  } else {
    alert("Authorization error.")
  }
}

function groupB() {
  const decoded = jwt.decode(store.storedJWT)
  if (decoded.group === "Group B") {
    alert("Success!")
  } else {
    alert("Authorization error.")
  }
}

function secret() {
  alert("Authorization error.")
}
</script>