import * as moment from "moment";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";

import { TransactionEntity } from "src/database/entities";
import { TransactionTypeEnum } from "src/database/enums";
import { LoadBalanceRequest, LoadBalancesFilter } from "./dtos/inputs";

@Injectable()
export class BalancesRepository {
    constructor (
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}
    
    async loadBalance(userId: string): Promise<number> {
        const query = this.transactionRepository.createQueryBuilder('t');
        query.select('SUM(t.value)')
        query.where('t.user_id = :userId', { userId })
        const queryResult = await query.getRawOne<{ sum: string }>();
        return this.getSumValue(queryResult?.sum);  
    }

    async loadRent(params: LoadBalanceRequest): Promise<number> {
        const query = this.buildRentAndDebitQuery(params);
        query.andWhere(`t.type = :type`, { type: TransactionTypeEnum.RENT });
        const queryResult = await query.getRawOne<{ sum: string }>();
        return this.getSumValue(queryResult?.sum);  
    }

    async loadDebit(params: LoadBalanceRequest): Promise<number> {
        const query = this.buildRentAndDebitQuery(params);
        query.andWhere(`t.type = :type`, { type: TransactionTypeEnum.DEBIT });
        const queryResult = await query.getRawOne<{ sum: string }>();
        return this.getSumValue(queryResult?.sum);        
    }

    private getSumValue(sum: string | undefined) {
        return Number(sum) ?? 0;;
    }

    private buildRentAndDebitQuery(params: LoadBalanceRequest): SelectQueryBuilder<TransactionEntity> {
        const { userId, filters } = params;
        const { startAt, endAt } = this.generateDatesFilter(filters);
        const query = this.transactionRepository.createQueryBuilder('t');
        query.select('SUM(t.value)');
        query.where('t.user_id = :userId', { userId });
        query.andWhere('t.is_ignored = false');
        query.andWhere('t.deleted_at IS NULL');
        query.andWhere('t.scheduled_at >= :startAt AND t.scheduled_at <= :endAt', { startAt, endAt });
        return query;
    } 
    
    private generateDatesFilter(filters: LoadBalancesFilter) {
        const now = moment();
        const month = filters.month ?? now.month();
        const year = Number(filters.year) ?? now.year();
        const filtedDate = now.month(month).year(year);
        const startAt = new Date(filtedDate.format('YYYY-MM-01'));
        const endAt = new Date(filtedDate.endOf('month').format('YYYY-MM-DD'));
        return { startAt, endAt }
    }
}