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
height: 16px;

/* XS (Old: XS)/400 (regular) */

font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
font-size: 11px;
line-height: 15px;
/* identical to box height, or 140% */


color: #BEC1CB;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
}
</style>