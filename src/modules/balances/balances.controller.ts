import { Controller, Get, UseGuards } from "@nestjs/common";

import { AuthGuard } from "src/guards";
import { UserEntity } from "src/database/entities";
import { GetUser } from "src/decorators";
import { BalancesService } from "./balances.service";

@Controller('balances')
@UseGuards(AuthGuard)
export class BalancesController {
    constructor(
        private readonly balancesService: BalancesService,
    ) {}

    @Get()
    load(
        @GetUser() user: UserEntity,
    ) {
        return this.balancesService.loadBalances({ userId: user.id });
    }
}