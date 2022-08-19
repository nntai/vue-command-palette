<template>
  <command-palette class="command-palette" :customerCommandsByGroup="customerGroupCommands"
    :isDisplayByGroup="isDisplayByGroup" />

</template>

<script setup lang="ts">
import CommandPalette from "./CommandPalette.vue";
import Command from "./models/command";
import { computed } from "vue";
import GroupCommand from "./models/groupCommand";
const isDisplayByGroup = computed(() => {
  return true;
});
const customerGroupCommands = computed(() => {
  return [
    new GroupCommand("Asia", [
      new Command("Armenia", "B", () => { alert("2"); }),
      new Command("Brunei", "Control+Shift+J", () => { alert("3"); }),
      new Command("China", "u+i", () => { alert("4"); }),
      new Command("Hong Kong", "m + c", () => { alert("5"); }),
    ]),
    new GroupCommand("Europe", [
      new Command("Austria", "m + g", () => { alert("10"); }),
      new Command("Bangladesh", "m + h", () => { alert("11"); }),
      new Command("Czech Republic", "m+i", () => { alert("12"); }),
      new Command("Denmark", "b + c", () => { alert("13"); }),
    ]),
    new GroupCommand("South America", [
      new Command("Argentina", "z+h", () => { alert("1"); }),
      new Command("Brazil", "z+k", () => { alert("1"); }),
      new Command("Colombia", "z+l", () => { alert("1"); }),
      new Command("Ecuador", "z+q", () => { alert("1"); }),
    ]),
    new GroupCommand("Africa", [
      new Command("Cameroon", "o+e", () => { alert("1"); }),
      new Command("Nigeria", "p+e", () => { alert("1"); }),
      new Command("Egypt", "t+e", () => { alert("1"); }),
      new Command("Algeria", "k+e", () => { alert("1"); }),
    ])
  ]
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

  background: rgba(0, 0, 0, 0.5)
}
</style>
