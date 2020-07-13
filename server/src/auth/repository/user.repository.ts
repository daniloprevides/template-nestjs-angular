import { EntityRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { RepositoryBase } from "../../common/repository/repository.base";

@EntityRepository(UserEntity)
export class UserRepository extends RepositoryBase<UserEntity>{

    
}