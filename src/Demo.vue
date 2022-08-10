<template>
  <command-palette class="command-palette" :customerCommands="customerCommands" />
</template>

<script setup lang="ts">
import CommandPalette from "./CommandPalette.vue";
import Command from "./models/command";
import { computed } from "vue";

  
  const customerCommands = computed(() => {
    return [new Command("place", "m", () => {alert("1");}), new Command("place place", "b", () => {alert("2");}), new Command("place place place", "m+b", () => {alert("3");})];
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
  
  padding: 15% 0% 0% 30%;

  background: rgba(0, 0, 0,  0.2)
}
</style>
