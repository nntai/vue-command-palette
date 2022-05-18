<template>
  <command-palette class="command-palette"/>
</template>

<script setup lang="ts">
import CommandPalette from './CommandPalette.vue';

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
.command-palette {
  flex: 1;
}
</style>
