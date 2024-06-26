import {
  Transaction,
  Currency,
} from "../services/transactions/src/transactions/entities/transaction.entity";

export const transactions: Transaction[] = [
  {
    id: "19156b6a-b96f-44c5-bf77-7a04998831f1",
    amount: 198.64,
    type: "bank",
    accountDetails: {
      currency: Currency.AUD,
    },
  },
  {
    id: "1b62d2b1-44dc-49fb-bb88-276b9c442ccc",
    amount: 574.94,
    type: "bank",
    accountDetails: {
      currency: Currency.JPY,
    },
  },
  {
    id: "e971a888-4a88-491a-89f5-7c19b8e870ed",
    amount: 803.62,
    type: "bank",
    accountDetails: {
      currency: Currency.AUD,
    },
  },
  {
    id: "e6bbde6b-f067-4962-91ec-068f9476d528",
    amount: 248.89,
    type: "bank",
    accountDetails: {
      currency: Currency.AUD,
    },
  },
  {
    id: "15f89d13-7ed1-41b7-9089-064b50d7a6ff",
    amount: 877.35,
    type: "bank",
    accountDetails: {
      currency: Currency.GBP,
    },
  },
  {
    id: "f3853b8f-95ae-4d6b-8740-51af6b1faa45",
    amount: 309.41,
    type: "peer",
    currency: Currency.JPY,
  },
  {
    id: "1c7f7d07-a605-440a-a3e9-cb380629c4c2",
    amount: 456.22,
    type: "peer",
    currency: Currency.JPY,
  },
  {
    id: "3bd7eea4-15eb-4f98-8934-f7c013f1de71",
    amount: 797.19,
    type: "peer",
    currency: Currency.USD,
  },
  {
    id: "1b0677cf-0ba0-4bc8-ae84-f661a610e93a",
    amount: 869.76,
    type: "peer",
    currency: Currency.GBP,
  },
  {
    id: "44928c6e-17fd-425c-bb3d-4d9cf706c935",
    amount: 438.38,
    type: "peer",
    currency: Currency.AUD,
  },
];
