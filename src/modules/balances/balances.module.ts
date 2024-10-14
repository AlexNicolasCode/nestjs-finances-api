import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalancesController } from "./balances.controller";
import { BalancesService } from "./balances.service";
import { TransactionEntity } from "src/database/entities";
import { BalancesRepository } from "./balances.repository";
import { AuthModule } from "../auth";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity,
        ]),
        AuthModule,
    ],
    controllers: [BalancesController],
    providers: [BalancesService, BalancesRepository],
})
export class BalancesModule {}