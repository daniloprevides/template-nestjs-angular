import { Injectable } from "@nestjs/common";
import { StoriesRepository } from "../repository/stories.repository";
import { ServiceBase } from "./services.base";
import { I18nService } from "nestjs-i18n";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { ConstantsEnum } from "../constants.enum";
import { RepositoryBase } from "../../common/repository/repository.base";

@Injectable()
export class StoriesService<T extends BaseEntity> extends ServiceBase<T> {
  constructor(
    protected readonly i18n: I18nService,
    @InjectRepository(StoriesRepository, ConstantsEnum.connectionName)
    protected readonly storiesRepository: StoriesRepository
  ) {
    super(
      i18n,
      StoriesService.name,
      (storiesRepository as unknown) as RepositoryBase<T>
    );
  }
}
