<template>
  <command-pallete class="command-pallete"/>
</template>

<script setup lang="ts">
import CommandPallete from './CommandPallete.vue';

</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0px;
}
#app {
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 8px;
}
.command-pallete {
  flex: 1;
}
</style>
