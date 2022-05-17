<script setup lang="ts">
import CmpInput from './components/CmpInput.vue';
import CmpList from './components/CmpList.vue';

</script>

<template>
  <div class="command-pallete-wrapper">
    <cmp-input class="cmp-input"/>
    <cmp-list class="cmp-list" />
  </div>
</template>

<style scoped>
.command-pallete-wrapper {
  display: flex;
  flex-direction: column;
}
.cmp-input {
  flex: 1;
  height: 50px;
}
.cmp-list {
  flex: 1;
}
</style>
