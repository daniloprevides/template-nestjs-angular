
import { IsString, Length, IsOptional } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


export class CharactersDTO{

    @ApiProperty({nullable: true})
    @Expose()
    @IsOptional()
    id?: string;

    @IsString()
    @Expose()
    @ApiProperty()
    name: string;
    
    @IsString()
    @Expose()
    @ApiProperty()
    description: string;
}