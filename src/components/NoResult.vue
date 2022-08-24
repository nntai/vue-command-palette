<template>
  <div>
    <div>
      <div class="no-research">
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'circle-exclamation']"
        /> &nbsp; No result matched your search
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FontAwesomeIcon from '../icons/fontAwesomeIcon';
import { defineComponent } from 'vue';

defineComponent({
  FontAwesomeIcon,
});
</script>
<style scoped>
.no-research .icon {
  color: var(--search-theme-orage)
}
.no-research{
text-align: center;

  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 16px;
height: 50px;
color: var(--secondary-color-darker);
}

</style>
