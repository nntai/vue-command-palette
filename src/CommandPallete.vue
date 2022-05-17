<template>
  <div class="command-pallete-wrapper">
    <cmp-input class="cmp-input" />
    <cmp-list class="cmp-list" />
  </div>
</template>
<script setup lang="ts">
import CmpInput from './components/CmpInput.vue';
import CmpList from './components/CmpList.vue';

</script>
<style scoped>
.command-pallete-wrapper {
  display: flex;
  flex-direction: column;
}
.cmp-input, .cmp-list {
  flex: 1;
  border: 1px solid gray;
}
.cmp-input {
  max-height: 50px;
}
.cmp-list {
  margin-top: 10px;
}
</style>
