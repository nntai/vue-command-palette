<template>
  <div>
    <span
      v-for="(characterInName, index) in commandNameArr"
      :key="index"
      :class="{'is-highlighted': props.highlightArr[index]}"
    >
      {{ characterInName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  commandName: {
    type: String,
    default: '',
  },
  highlightArr: {
    type: Array as PropType<boolean[]>,
    default () {
      return [];
    },
  },
});
const commandNameArr = computed(() => {
  return props.commandName.split('');
});

</script>
<style scoped>
  .is-highlighted {
    font-weight: bold;
    color: var(--primary-color);
  }
  .cmp-list-is-active .is-highlighted {
    font-weight: bold;
    color: var(--text-color-onhover);
    text-decoration: underline;
  }
</style>
