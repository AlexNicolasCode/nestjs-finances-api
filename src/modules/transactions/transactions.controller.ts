import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";

import { TransactionsService } from "./transactions.service";
import { AuthGuard } from "src/guards";
import { UserEntity } from "src/database/entities";
import { GetUser } from "src/decorators";
import { CreateTransactionDto, UpdateTransactionDto } from "./dtos";

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

    @Get(':id')
    loadOne(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ) {
        return this.transactionsService.loadTransaction({ userId: user.id, id });
    }
    
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTransactionDto,
        @GetUser() user: UserEntity,
    ) {
        return this.transactionsService.update({ id, userId: user.id, ...dto });
    }
    
    @Delete(':id')
    delete(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ) {
        return this.transactionsService.delete({ id, userId: user.id });
    }
}