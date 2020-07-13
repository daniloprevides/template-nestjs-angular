import { EntityRepository } from "typeorm";
import { StoryEntity } from "../entities/story.entity";
import { RepositoryBase } from "../../common/repository/repository.base";

@EntityRepository(StoryEntity)
export class StoriesRepository extends RepositoryBase<StoryEntity>{

    
}