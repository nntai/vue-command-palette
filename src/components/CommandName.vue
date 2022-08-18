<template>
  <div>
    <span v-for="(characterInName, index) in commandNameArr" :key="index" :class="{'is-highlighted': props.highlightArr[index]}" >
      {{characterInName}}
    </span>
  </div>
</template>

<script setup lang="ts">
  
  import { computed } from "vue";
  
  
  
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
    font-weight: bold;
    color: rgb(12, 12, 12);
    text-decoration: underline;
  }
  .cmp-list-is-active .is-highlighted {
    font-weight: bold;
    color: white;
    text-decoration: underline;
  }
</style>