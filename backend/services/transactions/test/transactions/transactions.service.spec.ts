import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../../src/transactions/transactions.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { of } from 'rxjs';
import { HttpException, NotFoundException } from '@nestjs/common';
import { Currency } from '../../src/transactions/entities/transaction.entity';
import { transactions } from '../../../../database/transactions-db';

describe('TransactionsService', () => {
    let service: TransactionsService;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [HttpModule, ConfigModule.forRoot()],
            providers: [
                TransactionsService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(() =>
                            of({ data: { data: { USD: 1.2 } }, status: 200 }),
                        ),
                    },
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a transaction by ID', () => {
        const transaction = transactions[0];
        expect(service.getById(transaction.id)).toEqual(transaction);
    });

    it('should throw NotFoundException for invalid id', () => {
        expect(() => service.getById('SELECT * FROM Transactions')).toThrow(
            NotFoundException,
        );
    });

    it('should convert a transaction', async () => {
        const transaction = transactions[0];
        const converted = await service.convertTransaction(
            transaction.id,
            Currency.USD,
        );

        expect(converted).toEqual({
            originalAmount: transaction.amount,
            convertedAmount: transaction.amount * 1.2,
        });
    });

    it('should throw exception if currency is not supported', async () => {
        const transaction = transactions[0];

        const response = service.convertTransaction(
            transaction.id,
            'TON' as Currency,
        );
        expect(response).rejects.toThrow(HttpException);
        expect(response).rejects.toThrow(
            `Currency TON is not supported. List of supported currencies: ${Object.values(Currency).join(', ')}`,
        );
    });

    it('should throw exception if API error occurs', async () => {
        module = await Test.createTestingModule({
            imports: [HttpModule, ConfigModule.forRoot()],
            providers: [
                TransactionsService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(() => of({ status: 500 })),
                    },
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);

        const transaction = transactions[0];

        await expect(
            service.convertTransaction(transaction.id, Currency.USD),
        ).rejects.toThrow(HttpException);
    });
});
