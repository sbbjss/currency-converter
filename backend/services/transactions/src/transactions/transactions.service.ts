import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Currency, Transaction } from './entities/transaction.entity';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { transactions } from '../../../../database/transactions-db';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    getById(id: string): Transaction | NotFoundException {
        const transaction = transactions.find(
            (transaction: Transaction) => transaction.id === id,
        );

        if (!transaction) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }

        return transaction;
    }

    async convertTransaction(
        id: string,
        currency: Currency,
    ): Promise<
        | HttpException
        | {
              originalAmount: number;
              convertedAmount: number;
          }
    > {
        if (!Object.values(Currency).includes(currency)) {
            throw new HttpException(
                `Currency ${currency} is not supported. List of supported currencies: ${Object.values(Currency).join(', ')}`,
                422,
            );
        }

        const transaction = this.getById(id);

        if (transaction instanceof NotFoundException) {
            throw transaction;
        }

        const apiKey = this.configService.get('FREECURRENCY_API_KEY');

        const baseCurrency =
            transaction.type === 'bank'
                ? transaction.accountDetails.currency
                : transaction.currency;

        const response = await lastValueFrom(
            this.httpService.get(`https://api.freecurrencyapi.com/v1/latest`, {
                headers: {
                    apikey: apiKey,
                },
                params: {
                    baseCurrency,
                    currencies: currency,
                },
            }),
        );

        if (response.status != 200) {
            throw new HttpException(response, response.status);
        }

        return {
            originalAmount: transaction.amount,
            convertedAmount: transaction.amount * response.data.data[currency],
        };
    }
}
