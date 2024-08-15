<template>
  <h2 class="d-flex justify-center mt-2">
    username
  </h2>
  <h3 class="d-flex justify-center mb-2">
    anyone
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
function anyone() {
  console.log("anyone placeholder")
}

function groupA() {
  console.log("groupA placeholder")
}

function groupB() {
  console.log("groupB placeholder")
}

function secret() {
  console.log("secret placeholder")
}
</script>