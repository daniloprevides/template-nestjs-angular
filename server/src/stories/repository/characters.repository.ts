import { EntityRepository } from "typeorm";
import { CharactersEntity } from "../entities/characters.entity";
import { RepositoryBase } from "../../common/repository/repository.base";

@EntityRepository(CharactersEntity)
export class CharactersRepository extends RepositoryBase<CharactersEntity>{

    
}