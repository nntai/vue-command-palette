<template>
  <div id="app">
    <treeselect v-model="value" :multiple="true" :options="[]" />
  </div>
</template>
<script setup lang="ts">
  import Treeselect from '@riophae/vue-treeselect';
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  import {defineComponent} from 'vue';
  
  defineComponent({
    Treeselect
  });
</script>
<style lang="">

</style>
