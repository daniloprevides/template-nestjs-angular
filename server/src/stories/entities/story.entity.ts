import { ManyToMany, Entity, Column, Index, JoinTable } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { PlaceEntity } from "./place.entity";

@Entity({ name: "story" })
export class StoryEntity extends BaseEntity {
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

  @ManyToMany(() => PlaceEntity, place => place.stories, {cascade: true})
  @JoinTable({name: 'story_place'})
  @Expose()
  @ApiProperty()
  places: PlaceEntity[];
}
