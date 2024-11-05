import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {

    @ApiProperty({
        example: 10,
        description: "Limit of Records to be returned"
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        example: 1,
        description: "Page Number - Pagination"
    })
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    offset?: number;
}