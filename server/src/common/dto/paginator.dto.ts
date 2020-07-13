import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../entities/base.entity";

export class PaginatorDTO<T>{
    @ApiProperty({type: Number, nullable: false})
    total:number;
    @ApiProperty({type: Number, nullable: true})
    totalPages?:number;
    @ApiProperty({type: String, nullable: true})
    nextPageParams?:string;
    @ApiProperty({type: String, nullable: true})
    lastPageParams?:string;
    @ApiProperty({type: BaseEntity, isArray: true})
    items: T[]
}