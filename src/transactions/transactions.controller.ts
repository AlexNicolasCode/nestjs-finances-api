import { Controller, Get, UseGuards } from "@nestjs/common";

import { TransactionsService } from "./transactions.service";
import { AuthGuard } from "src/guards";
import { UserEntity } from "src/database/entities";
import { GetUser } from "src/decorators";

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
    ) {}

    @Get()
    loadTransactions(
        @GetUser() user: UserEntity,
    ) {
        return this.transactionsService.loadTransactions({ userId: user.id });
    }
}