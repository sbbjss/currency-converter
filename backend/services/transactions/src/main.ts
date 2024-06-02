import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transform: true,
        }),
    );

    const options = new DocumentBuilder()
        .setTitle('Currency Conversion API')
        .setDescription('API for converting currency transactions')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup('/api', app, document);

    await app.listen(3001);
}

bootstrap();
