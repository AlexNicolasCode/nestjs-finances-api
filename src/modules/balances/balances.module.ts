import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BalancesController } from "./balances.controller";
import { BalancesService } from "./balances.service";
import { TransactionEntity } from "src/database/entities";
import { JwtModule } from "src/modules/jwt";
import { BalancesRepository } from "./balances.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity,
        ]),
        JwtModule,
    ],
    controllers: [BalancesController],
    providers: [BalancesService, BalancesRepository],
})
export class BalancesModule {}