import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CharactersEntity } from "./characters.entity";
import { StoryEntity } from "./story.entity";
import { NewsEntity } from "./news.entity";

export class Point {
  lat: number;
  lng: number;
}

@Entity({ name: "place" })
export class PlaceEntity extends BaseEntity {
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

  @Index()
  @Column({
    type: "point",
    transformer: {
      from: (v) => v,
      to: (v) => `${v.lat},${v.lng}`,
    },
  })
  @Expose()
  @ApiProperty()
  location: Point;

  @ManyToOne(() => CharactersEntity, {cascade: true})
  @JoinColumn()
  @Expose()
  @ApiProperty()
  character: CharactersEntity;

  @ManyToMany(() => StoryEntity, (story) => story.places)
  @Expose()
  @ApiProperty()
  stories: StoryEntity[];

  @ManyToMany(() => NewsEntity,{cascade: true})
  @JoinTable({ name: "place_news" })
  @Expose()
  @ApiProperty()
  news: NewsEntity[];
}
