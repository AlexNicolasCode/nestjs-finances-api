import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { TransactionTypeEnum } from "../enums/transaction-type.enum";

@Entity('transactions')
export class TransactionEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('uuid', { name: 'category_id' })
    categoryId: string;

    @Column('uuid', { name: 'user_id' })
    userId: string;

    @Column('varchar')
    type: TransactionTypeEnum;

    @Column('int')
    value: number;

    @Column('boolean', { name: 'is_ignored', default: false })
    isIgnored: boolean;

    @Column('timestamp', { name: 'scheduled_at' })
    scheduledAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deleteAt?: Date;
}