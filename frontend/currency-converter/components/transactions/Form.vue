<template>
  <div>
    <form>
      <UiTextField
        id="transactionId"
        label="Transaction ID"
        v-model="transactionId"
        placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        :error="showErrors ? errors.transactionId : ''"
      />
      <div class="flex justify-center mt-12">
        <UiButton v-if="showTransactionDetails" @click="reset">
          Reset
        </UiButton>
        <UiButton v-else @click="validateAndLoad" class="mt-4">
          Load transaction
        </UiButton>
      </div>
      <div v-if="showTransactionDetails" class="mt-6">
        <ReadOnlyCurrencyField
          id="transactionTotal"
          label="Transaction total"
          :currency="transactionCurrency"
          :amount="props.transaction?.amount || 0"
        />
        <div class="flex mt-12 mb-4 justify-center gap-4">
          <label
            for="convert-currency"
            class="self-center text-pagos-blue font-bold"
          >
            Convert to
          </label>
          <select
            v-model="currency"
            @change="handleSelect"
            id="convert-currency"
            class="p-2 bg-white block border border-pagos-blue rounded-md shadow-sm"
          >
            <option
              v-for="option in currencyOptions"
              class="px-2"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="flex justify-center mt-12">
          <ReadOnlyCurrencyField
            v-if="showConvertedAmount"
            class="flex-1"
            id="convertCurrency"
            label="Converted Total"
            :amount="convertedAmount"
            :currency="currency"
          />
          <UiButton
            v-else
            @click="validateAndConvert"
            class="w-[140px] bg-pagos-blue text-white"
          >
            Convert
          </UiButton>
        </div>
        <p v-if="apiError" class="text-red-500 text-sm text-center">
          {{ apiError }}
        </p>
        <p v-if="errors.currency" class="text-red-500 text-sm text-center">
          {{ errors.currency }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as z from "zod";
import { Currency } from "~/packages/transactions/Currency";
import { UiTextField, UiButton } from "#components";
import type { Transaction } from "~/packages/transactions/Transaction";
import { toTypedSchema } from "@vee-validate/zod";
import ReadOnlyCurrencyField from "~/components/ui/ReadOnlyCurrencyField.vue";

const showTransactionDetails = ref<boolean>(false);
const showConvertedAmount = ref<boolean>(false);
const showErrors = ref(false);

const props = defineProps<{
  convertedAmount: number | null;
  transaction: Transaction | null;
  apiError: string | null;
}>();

const emit = defineEmits<{
  (e: "loadTransaction", transactionId: string): void;
  (
    e: "convertTransaction",
    payload: { transactionId: string; currency: Currency }
  ): void;
}>();

const transactionCurrency = computed((): Currency | undefined => {
  return props.transaction?.type === "bank"
    ? props.transaction?.accountDetails.currency
    : props.transaction?.currency;
});

const schema = toTypedSchema(
  z.object({
    transactionId: z.string().uuid("Please enter a valid transaction ID"),
    currency: z
      .nativeEnum(Currency)
      .refine((value) => value !== transactionCurrency.value, {
        message: "Cannot convert to the same currency",
      }),
  })
);

const { handleSubmit, errors, validate } = useForm({
  validationSchema: schema,
});

const { value: transactionId } = useField("transactionId");
const { value: currency } = useField("currency");
currency.value = Currency.EUR;

const currencyOptions = Object.values(Currency);

const load = handleSubmit((values) => {
  emit("loadTransaction", values.transactionId);
});

const convert = handleSubmit((values) => {
  emit("convertTransaction", {
    transactionId: values.transactionId,
    currency: currency.value,
  });
});

const validateAndLoad = async () => {
  showErrors.value = true;
  const result = await validate();
  if (result.valid) {
    load();
  }
};

const validateAndConvert = async () => {
  showErrors.value = true;
  const result = await validate();
  if (result.valid) {
    convert();
  }
};

const handleSelect = () => {
  if (props.convertedAmount) {
    showConvertedAmount.value = false;
  }
};

const reset = () => {
  transactionId.value = "";
  showTransactionDetails.value = false;
  showConvertedAmount.value = false;
  currency.value = Currency.EUR;
  showErrors.value = false;
};

watch(
  () => props?.transaction?.id,
  (value) => {
    if (value) {
      return (showTransactionDetails.value = true);
    }

    return (showTransactionDetails.value = false);
  }
);

watch(
  () => props?.convertedAmount,
  (value) => {
    if (value) {
      return (showConvertedAmount.value = true);
    }

    return (showConvertedAmount.value = false);
  }
);
</script>
