import {
  Column,
  Entity,
  ManyToMany,
  JoinTable
} from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { Expose } from "class-transformer";
import { UserEntity } from "./user.entity";
import { ScopeEntity } from "./scope.entity";

@Entity({ name: "group" })
export class GroupEntity extends BaseEntity {

  @Column({
    nullable: false,
    unique: true
  })
  @Expose()
  name: string;

  @Column({
    nullable: true
  })
  @Expose()
  description: string;

  @Column({
    nullable: false, default: false
  })
  @Expose()
  isAdmin: boolean;

  @ManyToMany<ScopeEntity>(
    () => ScopeEntity,
    (scope: ScopeEntity) => scope.groups,
    {cascade: true}
  )
  @JoinTable({name: "group_scopes"})
  @Expose()
  scopes: ScopeEntity[];

  @ManyToMany<UserEntity>(
    () => UserEntity,
    (user: UserEntity) => user.groups
  )
  @Expose()
  users: UserEntity[];
}
