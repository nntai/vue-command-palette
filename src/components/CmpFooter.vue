<template>
  <div class="footer">
    <div><font-awesome-icon :icon="['fas', 'arrow-up']" /><font-awesome-icon :icon="['fas', 'arrow-down']" /> &nbsp; to navigate &nbsp;&nbsp; | &nbsp;&nbsp;<font-awesome-icon class="enter" :icon="['fas','arrow-turn-down']" /> &nbsp; to execute &nbsp;&nbsp; | &nbsp;&nbsp;  Esc to exit</div>
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
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
font-weight: 400;
font-size: 13px;
line-height: 20px;
/* identical to box height, or 133% */


/* Blue-gray/500 (Dark-D5) */

color: #BEC1CB;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
}
.enter{
  transform: rotate(90deg);
}
</style>