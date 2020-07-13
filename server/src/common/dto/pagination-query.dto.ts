import { ApiProperty } from "@nestjs/swagger";

export class PaginationQueryDTO{
    @ApiProperty({ type: Number, default: 0 })
    page = 0;
    @ApiProperty({ type: Number, default: 10 })
    size =10;
}