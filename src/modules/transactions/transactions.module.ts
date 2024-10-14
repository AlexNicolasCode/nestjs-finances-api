import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TransactionEntity } from "src/database/entities";
import { AuthModule } from "../auth";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity,
        ]),
        AuthModule,
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionModule {}