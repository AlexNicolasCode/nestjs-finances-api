import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { TransactionsService } from "./transactions.service";
import { AuthGuard } from "src/guards";
import { UserEntity } from "src/database/entities";
import { GetUser } from "src/decorators";
import { CreateTransactionDto } from "./dtos/create-transactions.dto";

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
    ) {}

    @Post()
    create(
        @GetUser() user: UserEntity,
        @Body() dto: CreateTransactionDto,
    ) {
        return this.transactionsService.create({ userId: user.id, ...dto });
    }

    @Get()
    load(
        @GetUser() user: UserEntity,
    ) {
        return this.transactionsService.loadTransactions({ userId: user.id });
    }
}