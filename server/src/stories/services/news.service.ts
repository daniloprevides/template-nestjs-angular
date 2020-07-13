import { Injectable } from "@nestjs/common";
import { NewsRepository } from "../repository/news.repository";
import { ServiceBase } from "./services.base";
import { I18nService } from "nestjs-i18n";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { ConstantsEnum } from "../constants.enum";
import { RepositoryBase } from "../../common/repository/repository.base";

@Injectable()
export class NewsService<T extends BaseEntity> extends ServiceBase<T> {
  constructor(
    protected readonly i18n: I18nService,
    @InjectRepository(NewsRepository, ConstantsEnum.connectionName)
    protected readonly newsRepository: NewsRepository
  ) {
    super(
      i18n,
      NewsService.name,
      (newsRepository as unknown) as RepositoryBase<T>
    );
  }
}
