<template>
    <command-palette class="command-palette" :themeMode="themeMode" :customerGroups="customerGroups" :isDisplayByGroup="isDisplayByGroup" />
</template>

<script setup lang="ts">
import CommandPalette from "./CommandPalette.vue";
import Command from "./models/command";
import { computed, ref } from "vue";
import GroupCommand from "./models/groupCommand";
import "./index.css"

const isDisplayByGroup = computed(() => {
  return true;
});
const themeMode = ref({
  dark: true,
  light: false
});
const changeTheme=()=>{
  themeMode.value.dark=!themeMode.value.dark;
  themeMode.value.light=!themeMode.value.light;
};
const customerGroups = computed(() => {
  return [
    {groupName:"Asia",
    commands:[
      {
        commandName:"Armenia", 
        commandKey:"B", 
        commandAction:() => {alert("2");}},
      {
        commandName:"Brunei", 
        commandKey:"Control+Shift+B", 
        commandAction:() => {alert("3");}},
      {
        commandName:"China", 
        commandKey:"u+i", 
        commandAction:() => {alert("4");}},
      {
        commandName:"Hong Kong", 
        commandKey:"m + c", 
        commandAction:() => {alert("5");}}
        ]},
    {groupName:"Europe",
    commands:[
      {commandName:"Austria", 
      commandKey:"B", 
      commandAction:() => {alert("10");}},
      {commandName:"Czech Republic", 
      commandKey:"m+i", 
      commandAction:() => {alert("10");}},
      {commandName:"Bangladesh", 
      commandKey:"m+h", 
      commandAction:() => {alert("10");}},
      {commandName:"Denmark", 
      commandKey:"b + c", 
      commandAction:() => {alert("10");}}
      ]},
    {groupName:"South America",
    commands:[
      {commandName:"Argentina", 
    commandKey:"z+h", 
    commandAction:() => {alert("1");}},
    {commandName:"Brazil", 
    commandKey:"z+k", 
    commandAction:() => {alert("1");}},
    {commandName:"Colombia", 
    commandKey:"z+l", 
    commandAction:() => {alert("1");}},
    {commandName:"Ecuador", 
    commandKey:"z+q", 
    commandAction:() => {alert("1");}}
    ]},
    {groupName:"Africa",
    commands:[
      {commandName:"Cameroon", 
      commandKey:"o+e", 
      commandAction:() => {alert("1");}},
      {commandName:"Nigeria", 
      commandKey:"p+e", 
      commandAction:() => {alert("1");}},
      {commandName:"Egypt", 
      commandKey:"t+e", 
      commandAction:() => {alert("1");}},
      {commandName:"Algeria", 
      commandKey:"k+e", 
      commandAction:() => {alert("1");}}
      ]},
    {groupName:"Change theme",
    commands:[
      {commandName:"Switch theme", 
      commandKey:"Control+m", 
      commandAction:() => {changeTheme();}},
      {commandName:"Test", 
      commandKey:"p+e", 
      commandAction:() => {}},
      ]},

  ];
});

const customerGroupCommands = computed(() => {
  return [
    new GroupCommand("Asia", [
      new Command("Armenia", "B", () => { alert("2"); }),
      new Command("Brunei", "Control+Shift+B", () => { alert("3"); }),
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
    ]),
    new GroupCommand("Change theme", [
      new Command("Switch theme", "Crlt + Shift + T", () => {changeTheme();}),
      new Command("Test", "p+e", () => { }),
    ])
  ]
});
</script>

<style>
</style>
