import { PaginatorDTO } from "./paginator.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResultPaginatorDTO<T>{
    @ApiProperty({type: Boolean, default: false})
    error:boolean;
    @ApiProperty({type: String})
    timestamp: string;
    @ApiProperty({type: String})
    path: string;
    @ApiProperty({type: PaginatorDTO})
    data: PaginatorDTO<T>;
}