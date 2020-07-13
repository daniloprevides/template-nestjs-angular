import { EntityRepository } from "typeorm";
import { NewsEntity } from "../entities/news.entity";
import { RepositoryBase } from "../../common/repository/repository.base";

@EntityRepository(NewsEntity)
export class NewsRepository extends RepositoryBase<NewsEntity>{

    
}