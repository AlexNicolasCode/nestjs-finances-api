import { IsBoolean, IsEnum, IsString, IsUUID } from "class-validator";

import { TransactionTypeEnum } from "src/database/enums/transaction-type.enum";

export class CreateTransactionDto {
    @IsString()
    title: string;

    @IsEnum(TransactionTypeEnum)
    type: TransactionTypeEnum;

    @IsUUID()
    categoryId: string;
    
    @IsBoolean()
    isIgnored: boolean;
} 