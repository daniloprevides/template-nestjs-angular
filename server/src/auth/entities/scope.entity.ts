import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { GroupEntity } from './group.entity';
import { Expose } from 'class-transformer';


@Entity({name: 'scope'})
export class ScopeEntity extends BaseEntity {


  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @ManyToMany<GroupEntity>(
    () => GroupEntity,
    (group: GroupEntity) => group.scopes
  )
  @Expose()
  @JoinColumn()
  groups: GroupEntity[];

}
