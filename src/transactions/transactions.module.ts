import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TransactionEntity } from "src/database/entities";
import { JwtModule } from "src/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity,
        ]),
        JwtModule,
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionModule {}