<template>
  <button
    :type="type"
    class="py-2 px-4 min-w-[140px] rounded-xl bg-pagos-blue text-white"
    :class="className"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event: Event) => {
  emit("click", event);
};
</script>
