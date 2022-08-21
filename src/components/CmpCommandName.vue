<template>
  <div>
    <span v-for="(character, index) in commandNameArray" :class="{'highlight':isHighlighted(index)}" :key="index">{{character}}</span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
    const props = defineProps({
    customerCommandName: {
      type: String,
      default: ""
    },
    highlightedIndexes:{
        type: Array,
        default: function(placeProps) {
        return [];
      }
    }
    
  });
  const isHighlighted = (index) => {
    for(let i = 0; i < props.highlightedIndexes.length; i++){
        if(index>= props.highlightedIndexes[i][0] && index<props.highlightedIndexes[i][1]){
            return true;
        }
    }
    return false;
  }
  const commandNameArray=computed(()=>{
    return props.customerCommandName.split('');
  });
  
</script>
<style scoped>
  
.highlight {
  color: aqua;
}
</style>