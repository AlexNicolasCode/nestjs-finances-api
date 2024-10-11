import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionEntity } from "src/database/entities";
import { CreateTransactionDto, UpdateTransactionDto } from './dtos';

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
    
    async update({ id, title, type, isIgnored, categoryId }: UpdateTransactionDto & { id: string }): Promise<TransactionEntity> {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
        });
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        transaction.title = title;
        transaction.type = type;
        transaction.isIgnored = isIgnored;
        transaction.categoryId = categoryId;
        this.transactionRepository.save(transaction);
        return transaction;
    }

    delete({ id }: { id: string }) {
        this.transactionRepository.softDelete({ id });
    }
} 