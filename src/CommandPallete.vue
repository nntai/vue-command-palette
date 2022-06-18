<template>
  <div class="command-pallete-place">
    <div class="command-pallete-wrapper" v-click-outside="closePlace">
      <cmp-input class="cmp-input" v-bind:inputText="textInputController" />
      <cmp-list class="cmp-list" v-bind:customerCommands="commandsController.customerCommands.value" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CmpInput from "./components/CmpInput.vue";
import CmpList from "./components/CmpList.vue";

import keysController from "./controllers/keysController";

import customerInputController from "./controllers/customerInputController";

import customerCommandController from "./controllers/customerCommandController";

import { onMounted, computed, watch, ref } from "vue";

const keysInputController = keysController();
const textInputController = customerInputController();
const commandsController = customerCommandController();
const modalStyle = ref("none");

const vClickOutside = {
  beforeMount(el, binding, vnode) {
    el.eventSetDrag = function () {
      el.setAttribute("data-dragging", "yes");
    };
    el.eventClearDrag = function () {
      el.removeAttribute("data-dragging");
    };
    el.eventOnClick = function (event) {
      var dragging = el.getAttribute("data-dragging");
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        binding.value(event);
      }
    };
    document.addEventListener("touchstart", el.eventClearDrag);
    document.addEventListener("touchmove", el.eventSetDrag);
    document.addEventListener("click", el.eventOnClick);
    document.addEventListener("touchend", el.eventOnClick);
  },
  unmounted(el) {
    document.removeEventListener("touchstart", el.eventClearDrag);
    document.removeEventListener("touchmove", el.eventSetDrag);
    document.removeEventListener("click", el.eventOnClick);
    document.removeEventListener("touchend", el.eventOnClick);
    el.removeAttribute("data-dragging");
  },
};

const closePlace = () => {
  modalStyle.value = "none";
};

onMounted(() => {
  window.addEventListener("keydown", keysInputController.onKeyDownInput);
  window.addEventListener("keyup", keysInputController.onKeyUpInput);
});

const keyCount = computed(() => {
  return keysInputController.keys.value.length;
});

const props = defineProps({
  modalKey: {
    type: String,
    default: "Control+k",
  },
  customerCommands: {
    type: Object,
    default: function(placeProps) {
      return [];
    }
  }
});

watch(keyCount, (value) => {
  if (0 < value) {
    if (keysInputController.isCustomerKey(props.modalKey)) {
      modalStyle.value = "block";
    }

    if (keysInputController.isCloseKey()) {
      modalStyle.value = "none";
    }
  }
});

  watch(textInputController.customerInput, (value) => {



    commandsController.getCustomerCommands(value, props.customerCommands);
  });
</script>
<style scoped>
.command-pallete-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 25%;
}
.command-pallete-place {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: v-bind("modalStyle");
}
.cmp-input,
.cmp-list {
  flex: 1;
  border: 1px solid gray;
}
.cmp-input {
  max-height: 50px;
}
.cmp-list {
  margin-top: 10px;
}
</style>
