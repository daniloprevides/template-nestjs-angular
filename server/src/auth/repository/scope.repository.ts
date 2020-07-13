import { EntityRepository } from "typeorm";
import { RepositoryBase } from "../../common/repository/repository.base";
import { ScopeEntity } from "../entities/scope.entity";

@EntityRepository(ScopeEntity)
export class ScopeRepository extends RepositoryBase<ScopeEntity>{

    
}