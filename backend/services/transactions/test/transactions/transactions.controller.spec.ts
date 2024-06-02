import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HttpException, NotFoundException } from '@nestjs/common';
import { TransactionsController } from '../../src/transactions/transactions.controller';
import { TransactionsService } from '../../src/transactions/transactions.service';
import { ConvertTransactionDto } from '../../src/transactions/dto/convert-transaction.dto';
import { Currency } from '../../src/transactions/entities/transaction.entity';
import { transactions } from '../../../../database/transactions-db';

describe('TransactionsController', () => {
    let controller: TransactionsController;
    let service: TransactionsService;

    beforeEach(async () => {
        const [module] = await Promise.all([
            Test.createTestingModule({
                imports: [HttpModule, ConfigModule.forRoot()],
                controllers: [TransactionsController],
                providers: [
                    TransactionsService,
                    {
                        provide: HttpService,
                        useValue: {
                            get: jest.fn(() =>
                                of({ data: { data: { USD: 1.2 } } }),
                            ),
                        },
                    },
                ],
            }).compile(),
        ]);

        controller = module.get<TransactionsController>(TransactionsController);
        service = module.get<TransactionsService>(TransactionsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return a transaction by ID', () => {
        const transaction = transactions[0];
        jest.spyOn(service, 'getById').mockReturnValue(transaction);
        expect(controller.getById(transaction.id)).toEqual(transaction);
    });

    it('should throw NotFoundException for invalid id', () => {
        jest.spyOn(service, 'getById').mockImplementation(() => {
            throw new NotFoundException();
        });
        expect(() => controller.getById('SELECT * FROM Transactions')).toThrow(
            NotFoundException,
        );
    });

    it('should convert a transaction', async () => {
        const transaction = transactions[0];
        const converted = {
            originalAmount: transaction.amount,
            convertedAmount: transaction.amount * 1.2,
        };
        jest.spyOn(service, 'convertTransaction').mockResolvedValue(converted);
        const dto: ConvertTransactionDto = { currency: Currency.USD };
        expect(
            await controller.convertTransaction(transaction.id, dto),
        ).toEqual(converted);
    });

    it('should throw exception if currency is not supported', async () => {
        const transaction = transactions[0];
        const dto: ConvertTransactionDto = { currency: 'BTC' as Currency };
        const response = controller.convertTransaction(transaction.id, dto);
        expect(response).rejects.toThrow(HttpException);
        expect(response).rejects.toThrow(
            `Currency BTC is not supported. List of supported currencies: ${Object.values(Currency).join(', ')}`,
        );
    });

    it('should throw exception if there is an error during conversion', async () => {
        const transaction = transactions[0];
        jest.spyOn(service, 'convertTransaction').mockImplementation(() => {
            return Promise.reject(HttpException);
        });
        const dto: ConvertTransactionDto = { currency: Currency.USD };
        expect(() =>
            controller.convertTransaction(transaction.id, dto),
        ).rejects.toThrow();
    });
});
