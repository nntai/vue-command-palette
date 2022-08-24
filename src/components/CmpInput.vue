<template>
  <div class="cmp-input-place">
    <div class="search-icon">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </div>
    <input
      type="text"
      :value="customerText"
      class="input-place"
      ref="cmpInput"
      placeholder="Select a command ..."
      @input="onInput"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch} from "vue";
import FontAwesomeIcon from "../icons/fontAwesomeIcon";
import { defineComponent } from "vue";
const props = defineProps({
  customerText: {
    type: String,
    default: "",
  },
  isModal: {
    type: Object,
    default: function () {
      return {};
    },
  },
});

const emits = defineEmits(["update-text"]);
const onInputChanged = (value: string) => {
  emits("update-text", value);
};

const onInput = (event: Event) => {
  onInputChanged((event.target as HTMLInputElement)!.value);
};

const cmpInput = ref();
watch(props.isModal.isModalValue, (value) => {
  if (value) {
    setTimeout(() => {
      cmpInput.value.focus();
    }, 0);
  }
});

defineComponent({
  FontAwesomeIcon,
});
</script>
<style scoped>
.cmp-input-place {
  border: 1px solid black;
  display: inline-block;
  width: 100%;
}
.search-icon {
  display: inline;
  width: 10%;
  padding: 10px;
  color: var(--primary-color);
  font-size: 20px;
}
.input-place {
  background-color: var(--secondary-color-reverse-lighter);
  width: 85%;
  outline: none;
  border: none;
}
.input {
  color: var(--secondary-color);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 20px;
}
.input-place:focus {
  outline: none;
  box-shadow: none;
}
</style>
