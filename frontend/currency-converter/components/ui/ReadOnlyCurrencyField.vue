<template>
  <div class="mb-4">
    <label :for="id" class="block text-pagos-blue">{{ label }}</label>
    <div
      class="mt-1 w-full border border-pagos-blue rounded-md shadow-sm flex justify-between items-center px-4 py-2"
    >
      <p class="font-semibold text-slate-800">
        {{ currency }}
      </p>
      <p class="font-semibold text-slate-800">
        {{ amountWithCurrencySymbol }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Currency, currencySymbols } from "~/packages/transactions/Currency";

const props = defineProps<{
  id: {
    type: String;
    required: true;
  };
  label: {
    type: String;
    required: true;
  };
  currency: {
    type: Currency;
    required: true;
  };
  amount: {
    type: Number;
    required: true;
  };
}>();

const amountWithCurrencySymbol = computed(() => {
  return `${currencySymbols[props.currency]} ${props.amount.toFixed(2)}`;
});
</script>
