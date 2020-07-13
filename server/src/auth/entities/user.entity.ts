import {
  Entity,
  Column,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsString, Length, IsEmail } from "class-validator";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../common/entities/base.entity";
import { GroupEntity } from "./group.entity";
import * as crypto from "crypto";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ length: 100 })
  @IsString()
  @ApiProperty()
  name: string;

  @Column({ length: 2000 })
  @IsString()
  @Expose()
  @ApiProperty()
  description: string;

  @Column({ length: 400, unique: true })
  @IsString()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;

  @Column({ length: 2000 })
  @IsString()
  password: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    default: false,
    name: "must_change_password",
  })
  @Expose()
  mustChangePassword: boolean;

  @ManyToMany<GroupEntity>(
    () => GroupEntity,
    (group: GroupEntity) => group.users,
    { cascade: true }
  )
  @JoinTable({ name: "user_groups" })
  @Expose()
  groups: GroupEntity[];

  validPassword(password: string) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return this.password === hash;
  }

  createPassword(password: string): { salt: string; hashedPassword: string } {
    const salt = this.createSalt();
    const hashedPassword = this.createHashedPassword(password, salt);

    return {
      hashedPassword: hashedPassword,
      salt: salt,
    };
  }

  private createSalt(): string {
    return crypto.randomBytes(16).toString("hex");
  }

  private createHashedPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }
}
