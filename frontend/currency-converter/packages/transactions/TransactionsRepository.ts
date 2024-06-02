import type { Transaction } from "~/packages/transactions/Transaction";
import type { Currency } from "~/packages/transactions/Currency";
import { useRuntimeConfig } from "#app";

export class TransactionsRepository {
  private readonly baseUrl: string;

  constructor() {
    const config = useRuntimeConfig();
    this.baseUrl = config.public.transactionsApiUrl;
  }

  async getById(id: string): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction with id ${id}`);
    }
    return response.json();
  }

  async convertTransaction(
    id: string,
    currency: Currency
  ): Promise<{
    originalAmount: number;
    convertedAmount: number;
  }> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currency }),
    });
    if (!response.ok) {
      throw new Error(`Failed to convert transaction with id ${id}`);
    }
    return response.json();
  }
}
