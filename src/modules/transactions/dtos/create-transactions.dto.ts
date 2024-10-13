import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from "class-validator";

import { TransactionTypeEnum } from "src/database/enums/transaction-type.enum";

export class CreateTransactionDto {
    @IsString()
    title: string;

    @IsEnum(TransactionTypeEnum)
    type: TransactionTypeEnum;

    @IsNumber()
    value: number;

    @IsUUID()
    categoryId: string;
    
    @IsBoolean()
    isIgnored: boolean;
} 