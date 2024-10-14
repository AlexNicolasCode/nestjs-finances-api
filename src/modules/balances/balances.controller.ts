import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "src/guards";
import { UserEntity } from "src/database/entities";
import { GetUser } from "src/decorators";
import { BalancesService } from "./balances.service";
import { LoadBalancesFilter } from "./dtos/inputs";

@Controller('balances')
@UseGuards(AuthGuard)
export class BalancesController {
    constructor(
        private readonly balancesService: BalancesService,
    ) {}

    @Get()
    load(
        @Query() filters: LoadBalancesFilter,
        @GetUser() user: UserEntity,
    ) {
        return this.balancesService.loadBalances({ userId: user.id, filters });
    }
}