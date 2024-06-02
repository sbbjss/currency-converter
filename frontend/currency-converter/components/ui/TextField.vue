<template>
  <div class="mb-4">
    <label :for="id" class="block text-pagos-blue">{{ label }}</label>
    <input
      :id="id"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      class="mt-1 px-2 h-8 block w-full border border-pagos-blue focus:outline-none rounded-md shadow-sm"
      @input="updateValue($event?.target?.value)"
    />
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  id: {
    type: String;
    required: true;
  };
  label: {
    type: String;
    required: true;
  };
  modelValue: {
    type: String;
    default: "";
  };
  error: {
    type: String;
    default: "";
  };
  placeholder: {
    type: String;
    default: "";
  };
  disabled: {
    type: Boolean;
    default: false;
  };
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value: string) => {
  emit("update:modelValue", value);
};
</script>
