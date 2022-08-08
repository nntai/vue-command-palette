<template>
  <div>
  <div></div>
    <!-- <div v-for="(customerCommand, index) in props.customerCommands" :key="index" :class="{'cmp-list-is-active': isCommandActive(customerCommand.getCommandName())}" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.getCommandAction()(); props.closeModal();}">
      <div class="cmp-list cmp-list-left">{{customerCommand.getCommandName()}}</div>
      <div class="cmp-list cmp-list-right">{{customerCommand.getCommandKey()}}</div>
    </div> -->
    <div>
        <div>NO RESULT</div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
  
</style>