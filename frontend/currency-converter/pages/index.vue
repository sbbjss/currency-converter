<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div
      class="bg-white border border-blue-100 shadow-lg rounded-3xl px-12 py-6 w-[480px] h-[640px]"
    >
      <h1 class="text-2xl font-bold mt-4 mb-8 text-center text-slate-800">
        Currency Converter
      </h1>
      <hr class="border-pagos-blue border-1 mx-auto mb-4" />
      <TransactionsForm
        :convertedAmount="convertedAmount"
        :transaction="transaction"
        :apiError="apiError"
        @loadTransaction="loadTransaction"
        @convertTransaction="convertTransaction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TransactionsForm from "~/components/transactions/Form.vue";
import { TransactionsRepository } from "~/packages/transactions/TransactionsRepository";
import type { Transaction } from "~/packages/transactions/Transaction";
import { Currency } from "~/packages/transactions/Currency";

const transaction = ref<Transaction | null>(null);
const apiError = ref<string | null>(null);
const convertedAmount = ref<number | null>(null);

const transactionRepository = new TransactionsRepository();

const loadTransaction = async (transactionId: string): Promise<void> => {
  transaction.value = null;

  try {
    transaction.value = await transactionRepository.getById(transactionId);
  } catch (error) {
    console.error("Failed to load transaction:", error);
    apiError.value = error as string;
    transaction.value = null;
  }
};

const convertTransaction = async ({
  transactionId,
  currency,
}: {
  transactionId: string;
  currency: Currency;
}): Promise<void> => {
  convertedAmount.value = null;

  try {
    const result = await transactionRepository.convertTransaction(
      transactionId,
      currency
    );
    if (transaction.value) {
      convertedAmount.value = result.convertedAmount;
    }
  } catch (error) {
    console.error("Failed to convert transaction:", error);
    apiError.value = error as string;
  }
};
</script>
