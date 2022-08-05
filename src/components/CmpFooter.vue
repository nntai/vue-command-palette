<template>
  <div>
    Cmp Footer
    <div><font-awesome-icon :icon="['fas', 'arrow-up']" /><font-awesome-icon :icon="['fas', 'arrow-down']" /> to navigate, <font-awesome-icon :icon="['']" /> to execute and Control + K to open modal</div>
  </div>
</template>

<script setup lang="ts">
  import FontAwesomeIcon from "../icons/fontAwesomeIcon";
  import { defineComponent } from "vue";

  defineComponent({
    FontAwesomeIcon
  });
</script>


<style lang="">
</style>