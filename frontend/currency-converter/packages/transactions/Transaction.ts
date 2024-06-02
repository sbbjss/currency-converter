import type { Currency } from "~/packages/transactions/Currency";

export type TransactionType = "bank" | "peer";

interface BaseTransaction {
  id: string;
  amount: number;
  type: TransactionType;
}

interface BankTransaction extends BaseTransaction {
  type: "bank";
  accountDetails: {
    currency: Currency;
  };
}

interface PeerTransaction extends BaseTransaction {
  type: "peer";
  currency: Currency;
}

export type Transaction = BankTransaction | PeerTransaction;
