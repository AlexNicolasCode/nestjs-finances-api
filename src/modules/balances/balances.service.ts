import moment from "moment";
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionEntity } from "src/database/entities";
import { LoadBalancesResponse } from "./dtos/outputs";
import { TransactionTypeEnum } from "src/database/enums/transaction-type.enum";

@Injectable()
export class BalancesService {
    constructor (
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}
        
    async loadBalances({ userId }: { userId: string }): Promise<LoadBalancesResponse> {
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
        const { rent, debit } = this.generateRentAndDebit(transactions);
        response.rent = rent;
        response.debit = debit;
        return response;
    }

    private generateRentAndDebit(transactions: TransactionEntity[]): { rent: number; debit: number } {
        const rentAndDebit = { rent: 0, debit: 0 } ;
        const monthTransactions = transactions.filter((t) => this.isMonthTransaction(t));
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

    private isMonthTransaction(transaction: TransactionEntity): boolean {
        const scheduledAt = moment(transaction.scheduledAt);
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        if (scheduledAt >= startOfMonth && scheduledAt <= endOfMonth) {
            return true;
        }
        return false;
    }
} 