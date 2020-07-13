import { ApiProperty } from "@nestjs/swagger";
import { Any } from "typeorm";

export class ResultDTO<T>{
    @ApiProperty({type: Boolean, default: false})
    error:boolean;
    @ApiProperty({type: String})
    timestamp: string;
    @ApiProperty({type: String})
    path: string;
    @ApiProperty({type: Any})
    data: T;
}