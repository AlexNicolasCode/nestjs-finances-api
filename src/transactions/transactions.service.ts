import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from "src/database/entities";

@Injectable()
export class TransactionsService {
    constructor (
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}
    
    loadTransactions({ userId }: { userId: string }) {
        return this.transactionRepository.find({
            where: { userId },
        });
    }
} 