import { IsEnum, IsOptional, IsString } from "class-validator";

import { MonthsEnum } from "../../enums";

export class LoadBalancesFilter {
    @IsOptional()
    @IsString()
    year?: string;

    @IsOptional()
    @IsEnum(MonthsEnum)
    month?: MonthsEnum;
} 