import { v4 as uuidv4 } from 'uuid';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionEntity } from "src/database/entities";
import { CreateTransactionDto } from "./dtos/create-transactions.dto";

@Injectable()
export class TransactionsService {
    constructor (
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}
    
    create({ userId, title, type, isIgnored, categoryId }: CreateTransactionDto & { userId: string }): TransactionEntity {
        const transaction = this.transactionRepository.create();
        transaction.id = uuidv4();
        transaction.title = title;
        transaction.type = type;
        transaction.isIgnored = isIgnored;
        transaction.categoryId = categoryId;
        transaction.userId = userId;
        this.transactionRepository.save(transaction);
        return transaction;
    }
    
    loadTransactions({ userId }: { userId: string }) {
        return this.transactionRepository.find({
            where: { userId },
        });
    }
} 