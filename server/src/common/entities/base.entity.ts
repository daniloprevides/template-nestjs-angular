import {
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  PrimaryGeneratedColumn,
  Index,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Expose } from "class-transformer";
import { validateOrReject, IsDefined, IsOptional } from "class-validator";
import { I18nService } from "nestjs-i18n";
import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class BaseEntity {
  constructor() {}
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({nullable: true})
  @Expose()
  @IsOptional()
  id?: string;

  @Index()
  @Column({ nullable: false, default: true })
  @ApiProperty()
  @Expose()
  active: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
