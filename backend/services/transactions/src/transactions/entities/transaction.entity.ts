export type TransactionType = 'bank' | 'peer';

interface BaseTransaction {
    id: string;
    amount: number;
    type: TransactionType;
}

interface BankTransaction extends BaseTransaction {
    type: 'bank';
    accountDetails: {
        currency: Currency;
    };
}

interface PeerTransaction extends BaseTransaction {
    type: 'peer';
    currency: Currency;
}

export type Transaction = BankTransaction | PeerTransaction;

// Freecurrency API supported currencies
// https://freecurrencyapi.com/docs/currency-list
export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
    JPY = 'JPY',
    BGN = 'BGN',
    CZK = 'CZK',
    DKK = 'DKK',
    GBP = 'GBP',
    HUF = 'HUF',
    PLN = 'PLN',
    RON = 'RON',
    SEK = 'SEK',
    CHF = 'CHF',
    ISK = 'ISK',
    NOK = 'NOK',
    HRK = 'HRK',
    RUB = 'RUB',
    TRY = 'TRY',
    AUD = 'AUD',
    BRL = 'BRL',
    CAD = 'CAD',
    CNY = 'CNY',
    HKD = 'HKD',
    IDR = 'IDR',
    ILS = 'ILS',
    INR = 'INR',
    KRW = 'KRW',
    MXN = 'MXN',
    MYR = 'MYR',
    NZD = 'NZD',
    PHP = 'PHP',
    SGD = 'SGD',
    THB = 'THB',
    ZAR = 'ZAR',
}
