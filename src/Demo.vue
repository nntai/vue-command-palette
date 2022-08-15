<template>
  <command-palette class="command-palette" :customerCommands="customerCommands" />
</template>

<script setup lang="ts">
import CommandPalette from "./CommandPalette.vue";
import Command from "./models/command";
import { computed } from "vue";

  
  const customerCommands = computed(() => {
    return [new Command("place", "m", () => {alert("1");}),
     new Command("place place", "b", () => {alert("2");}),
     new Command("place place place test 1", "Shift+a", () => {alert("3");}),
     new Command("place place place test 2", "m + b", () => {alert("4");}),
     new Command("place place place test 3", "m + c", () => {alert("5");}),
     new Command("place place place test 4", "m + d", () => {alert("6");}),
     new Command("place place place test 5", "m + e", () => {alert("7");}),
     new Command("place place place test 6", "m + f", () => {alert("8");}),
     new Command("avbc", "m + t", () => {alert("9");}),
     new Command("place place place test 7", "m + g", () => {alert("10");}),
     new Command("place place place test 8", "m + h", () => {alert("11");}),
     new Command("place place place test 9", "m + i", () => {alert("12");}),
     new Command("place place place test 10", "b + c", () => {alert("13");}),
     new Command("place place place test 11", "n + m", () => {alert("14");}),
     new Command("place place place test 12", "m + v", () => {alert("15");}),
     new Command("place place place test 13", "b + c", () => {alert("13");}),
     new Command("place place place test 14", "n + m", () => {alert("14");}),
     new Command("place place place test 15", "b + c", () => {alert("13");}),
     new Command("place place place test 16", "n + m", () => {alert("14");})]
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

  background: rgba(0, 0, 0,  0.5)
}
</style>
