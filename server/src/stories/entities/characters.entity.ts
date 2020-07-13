import { Entity, Column, Index, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: 'character'})
export class CharactersEntity extends BaseEntity {
  @Index()
  @Column({ length: 100 })
  @IsString()
  @Length(0, 100, {
    message: () => {
      return this.i18n.translate("VALIDATE_NAME_MAX_LENGTH", {
        args: { maxLength: 100 },
      });
    },
  })
  @Expose()
  @ApiProperty()
  name: string;

  @Column({ length: 2000 })
  @IsString()
  @Length(0, 100, {
    message: () => {
      return this.i18n.translate("VALIDATE_NAME_MAX_LENGTH", {
        args: { maxLength: 100 },
      });
    },
  })
  @Expose()
  @ApiProperty()
  description: string;


}
