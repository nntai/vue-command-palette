<template>
  <div class="footer">
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


<style scoped>
.footer {
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */


/* Blue-gray/500 (Dark-D5) */

color: #BEC1CB;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
}
</style>