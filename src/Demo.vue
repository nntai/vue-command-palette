<template>
  <command-palette class="command-palette" :customerCommands="customerCommands" />
</template>

<script setup lang="ts">
import CommandPalette from "./CommandPalette.vue";
import Command from "./models/command";
import { computed } from "vue";

  
  const customerCommands = computed(() => {
    return [new Command("place", "m", () => {alert("");}), new Command("place place", "b", () => {alert("");}), new Command("place place place", "m+b", () => {alert("");})];
  });
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
  background-color: #111111;
  padding: 17px 17px 17px 17px;
}
</style>
