<template>
  <command-palette class="command-palette" :customerCommands="customerCommands" />
</template>

<script setup lang="ts">
import CommandPalette from "./CommandPalette.vue";
import Command from "./models/command";
import { computed } from "vue";


  const customerCommands = computed(() => {
    return [
      new Command("place", "M", () => {alert("");}),
      new Command("test", "A", () => {alert("");}) ,
      new Command("place test", "Ctrl + M", () => {alert("place test");})
    ];
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


  background-color: #839742
}
.command-palette {
  background-color: purple;
  padding: 2% 25%;
}
</style>
