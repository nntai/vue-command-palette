<template>
  <div>
    <span v-for="(characterInName, index) in commandNameArr" :key="index" :class="{'is-highlighted': isHighlighted(index, props.highlightArr)}" >
      {{characterInName}}
    </span>
  </div>
</template>

<script setup lang="ts">
  
  import { computed } from "vue";

  import { isHighlighted } from "../places/highlightText";
  
  
  
  const props = defineProps({
    commandName: {
      type: String,
      default: ""
    },
    highlightArr: {
      type: Array,
      default: function(placeProps) {
        return [];
      }
    }
  });

  const commandNameArr = computed(() => {
    return props.commandName.split("");
  });




</script>


<style scoped>
  .is-highlighted {
    font-weight: bold
  }
</style>