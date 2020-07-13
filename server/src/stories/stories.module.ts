import * as path from "path";
import { Module, HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StoriesController } from "./controllers/stories.controller";
import { StoriesService } from "./services/stories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from "typeorm-transactional-cls-hooked";
import { I18nModule, I18nJsonParser, I18nService } from "nestjs-i18n";
import { StoryEntity } from "./entities/story.entity";
import { StoriesRepository } from "./repository/stories.repository";
import { BaseEntity } from "../common/entities/base.entity";
import { ConstantsEnum } from "./constants.enum";
/*Characters*/ 
import { CharactersRepository } from "./repository/characters.repository"; 
import { CharactersEntity } from "./entities/characters.entity"; 
import { CharactersService } from "./services/characters.service"; 
import { CharactersController } from "./controllers/characters.controller"; 

/*Place*/ 
import { PlaceRepository } from "./repository/place.repository"; 
import { PlaceEntity } from "./entities/place.entity"; 
import { PlaceService } from "./services/place.service"; 
import { PlaceController } from "./controllers/place.controller"; 
/*News*/ 
import { NewsRepository } from "./repository/news.repository"; 
import { NewsEntity } from "./entities/news.entity"; 
import { NewsService } from "./services/news.service"; 
import { NewsController } from "./controllers/news.controller"; 
import { RepositoryBase } from "../common/repository/repository.base";
/*IMPORTS*/


@Module({
  controllers: [StoriesController , CharactersController  , PlaceController , NewsController /*CONTROLLERS*/],
  providers: [StoriesService, RepositoryBase, BaseEntity, StoriesRepository  , CharactersService, CharactersRepository  , PlaceService, PlaceRepository , NewsService, NewsRepository /*PROVIDERS*/],
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV
          ? `src/stories/.env.${process.env.NODE_ENV}`
          : "src/stories/.env",
        ".env.default",
      ],
    }),
    HttpModule,
    //Creating a connection per module
    TypeOrmModule.forRoot({
      ...databaseConfig(),
      name: ConstantsEnum.connectionName,
    }),
    TypeOrmModule.forFeature(
      [StoryEntity, StoriesRepository  , CharactersEntity, CharactersRepository  , PlaceEntity, PlaceRepository , NewsEntity, NewsRepository /*FEATURES*/],
      ConstantsEnum.connectionName
    ),
  ],
})
export class StoriesModule {
  constructor() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}
