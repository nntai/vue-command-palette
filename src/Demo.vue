<template>
  <command-pallete class="command-pallete" v-bind:customerCommands="[{commandName: 'place', commandKey: 'm', commandAction: () => {}}]" />
</template>

<script setup lang="ts">
import CommandPallete from "./CommandPallete.vue";
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
  background-color: #111111;
  padding: 17px 17px 17px 17px;
}
</style>
