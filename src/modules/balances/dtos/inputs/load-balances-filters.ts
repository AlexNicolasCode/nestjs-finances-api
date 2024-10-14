import { IsEnum, IsNumber, IsOptional } from "class-validator";

import { MonthsEnum } from "../../enums";

export class LoadBalancesFilter {
    @IsOptional()
    @IsNumber()
    year?: number

    @IsOptional()
    @IsEnum(MonthsEnum)
    month?: MonthsEnum;
} 