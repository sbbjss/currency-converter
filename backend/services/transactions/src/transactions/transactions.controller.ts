import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ConvertTransactionDto } from './dto/convert-transaction.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @ApiParam({
        name: 'id',
        description: 'The ID of the transaction',
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Retrieve a transaction by ID.' })
    @ApiResponse({ status: 404, description: 'Transaction not found.' })
    @Get(':id')
    getById(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.transactionsService.getById(id);
    }

    @ApiParam({
        name: 'id',
        description: 'The ID of the transaction',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Convert transaction amount to specified currency.',
    })
    @ApiResponse({ status: 404, description: 'Transaction not found.' })
    @ApiResponse({ status: 422, description: 'Currency not supported.' })
    @Post(':id/convert')
    convertTransaction(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() convertTransactionDto: ConvertTransactionDto,
    ) {
        return this.transactionsService.convertTransaction(
            id,
            convertTransactionDto.currency,
        );
    }
}
