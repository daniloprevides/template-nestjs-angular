import { EntityRepository } from "typeorm";
import { RepositoryBase } from "../../common/repository/repository.base";
import { GroupEntity } from "../entities/group.entity";

@EntityRepository(GroupEntity)
export class GroupRepository extends RepositoryBase<GroupEntity>{

    
}