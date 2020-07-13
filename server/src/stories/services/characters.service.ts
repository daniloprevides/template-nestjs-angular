
import { Injectable } from "@nestjs/common";
import { CharactersRepository } from "../repository/characters.repository";
import { ServiceBase } from "./services.base";
import { I18nService } from "nestjs-i18n";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { ConstantsEnum } from "../constants.enum";
import { RepositoryBase } from "../../common/repository/repository.base";

@Injectable()
export class CharactersService<T extends BaseEntity> extends ServiceBase<T> {
  constructor(
    protected readonly i18n: I18nService,
    @InjectRepository(CharactersRepository, ConstantsEnum.connectionName)
    protected readonly charactersRepository: CharactersRepository
  ) {
    super(
      i18n,
      CharactersService.name,
      (charactersRepository as unknown) as RepositoryBase<T>
    );
  }
}
