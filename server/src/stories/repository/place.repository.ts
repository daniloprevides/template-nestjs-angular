import { EntityRepository } from "typeorm";
import { PlaceEntity } from "../entities/place.entity";
import { RepositoryBase } from "../../common/repository/repository.base";

@EntityRepository(PlaceEntity)
export class PlaceRepository extends RepositoryBase<PlaceEntity>{

    
}