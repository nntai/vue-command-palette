<template>
  <div>
    Cmp List
    <div v-for="customerCommand in props.customerCommands" :key="customerCommand.key">
      <div class="cmp-list" id="cmp-list-left">{{customerCommand.commandName}}</div>
      <div class="cmp-list" id="cmp-list-right">{{customerCommand.commandKey}}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    customerCommands: {
      type: Object,
      default: function(placeProps) {
        return [];
      }
    }
  });
</script>
<style scoped>
  




  .cmp-list {
    display: inline-block;
    width: 50%;
  }


  #cmp-list-left {
    text-align: left;
  }








  #cmp-list-right {
    text-align: right;
  }
</style>
