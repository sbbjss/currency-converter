import { IsString } from 'class-validator';
import { Currency } from '../entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertTransactionDto {
    @ApiProperty({
        example: 'USD',
        description:
            'The currency to convert to. List of supported currencies: https://freecurrencyapi.com/docs/currency-list',
    })
    @IsString()
    currency: Currency;
}
