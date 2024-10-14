import { Injectable } from "@nestjs/common";

import { LoadBalancesResponse } from "./dtos/outputs";
import { LoadBalanceRequest } from "./dtos/inputs";
import { BalancesRepository } from "./balances.repository";

@Injectable()
export class BalancesService {
    constructor (
        private readonly balancesRepository: BalancesRepository,
    ) {}
        
    async loadBalances(params: LoadBalanceRequest): Promise<LoadBalancesResponse> {
        const [current, utilDate, debit, rent] = await Promise.all([
            this.balancesRepository.loadBalance(params.userId),
            this.balancesRepository.loadBalanceUntilEnd(params),
            this.balancesRepository.loadDebit(params),
            this.balancesRepository.loadRent(params),
        ]);
        return { current, utilDate, rent, debit };
    }
} 