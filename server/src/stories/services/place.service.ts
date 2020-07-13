
import { Injectable } from "@nestjs/common";
import { PlaceRepository } from "../repository/place.repository";
import { ServiceBase } from "./services.base";
import { I18nService } from "nestjs-i18n";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { ConstantsEnum } from "../constants.enum";
import { RepositoryBase } from "../../common/repository/repository.base";

@Injectable()
export class PlaceService<T extends BaseEntity> extends ServiceBase<T> {
  constructor(
    protected readonly i18n: I18nService,
    @InjectRepository(PlaceRepository, ConstantsEnum.connectionName)
    protected readonly placeRepository: PlaceRepository
  ) {
    super(
      i18n,
      PlaceService.name,
      (placeRepository as unknown) as RepositoryBase<T>
    );
  }
}
