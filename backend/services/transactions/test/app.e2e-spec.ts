import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigModule } from '@nestjs/config';

describe('Transactions API (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule, ConfigModule.forRoot()],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/transactions/:id (GET)', () => {
        const transactionId = '19156b6a-b96f-44c5-bf77-7a04998831f1';
        return request(app.getHttpServer())
            .get(`/transactions/${transactionId}`)
            .expect(200)
            .expect((response) => {
                expect(response.body).toHaveProperty('id', transactionId);
            });
    });

    it('/transactions/:id/convert (POST)', () => {
        const transactionId = '19156b6a-b96f-44c5-bf77-7a04998831f1';
        return request(app.getHttpServer())
            .post(`/transactions/${transactionId}/convert`)
            .send({ currency: 'USD' })
            .expect(201)
            .expect((response) => {
                expect(response.body).toHaveProperty('originalAmount');
                expect(response.body).toHaveProperty('convertedAmount');
            });
    });
});
