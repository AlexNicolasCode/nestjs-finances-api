import  * as moment from "moment";
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionEntity } from "src/database/entities";
import { LoadBalancesResponse } from "./dtos/outputs";
import { TransactionTypeEnum } from "src/database/enums";
import { LoadBalancesFilter } from "./dtos/inputs";

@Injectable()
export class BalancesService {
    constructor (
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}
        
    async loadBalances({ userId, filters }: { userId: string; filters: LoadBalancesFilter }): Promise<LoadBalancesResponse> {
        const response: LoadBalancesResponse = {
            balance: 0,
            rent: 0,
            debit: 0
        }; 
        const transactions = await this.transactionRepository.find({
            select: ['type', 'value', 'scheduledAt', 'isIgnored'],
            where: { userId },
        });
        transactions.forEach((t) => response.balance += t.value);
        const { rent, debit } = this.generateRentAndDebit({ transactions, filters });
        response.rent = rent;
        response.debit = debit;
        return response;
    }

    private generateRentAndDebit({ transactions, filters }: { transactions: TransactionEntity[]; filters: LoadBalancesFilter }): { rent: number; debit: number } {
        const rentAndDebit = { rent: 0, debit: 0 };
        const monthTransactions = transactions.filter((transaction) => this.isFiltedTransaction({ transaction, filters }));
        monthTransactions.forEach((t) => {
            const balanceMapper = {
                [TransactionTypeEnum.RENT]: 'rent',
                [TransactionTypeEnum.DEBIT]: 'debit',
            }
            if (t.isIgnored) {
                return;
            }
            const field = balanceMapper[t.type];
            rentAndDebit[field] += t.value;
        });
        return rentAndDebit;
    }

    private isFiltedTransaction({ transaction, filters }: { transaction: TransactionEntity; filters: LoadBalancesFilter }): boolean {
        const now = moment();
        const month = filters.month ?? now.month();
        const year = Number(filters.year) ?? now.year();
        const scheduledAt = moment(transaction.scheduledAt).format('YYYY-MM-DD');
        const filtedDate = now.month(month).year(year);
        const firstDayOfMonth = filtedDate.format('YYYY-MM-01');
        const lastDayOfMonth = filtedDate.endOf('month').format('YYYY-MM-DD');
        if (scheduledAt >= firstDayOfMonth && scheduledAt <= lastDayOfMonth) {
            return true;
        }
        return false;
    }
} 