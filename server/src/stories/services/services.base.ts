import { Logger } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { BaseEntity } from "../../common/entities/base.entity";
import { PaginatorDTO } from "../../common/dto/paginator.dto";
import { RepositoryBase } from "../../common/repository/repository.base";

export class ServiceBase<T extends BaseEntity> {
  logger: Logger;


  constructor(
    protected readonly i18n: I18nService,
    protected readonly className: string,
    protected readonly repository: RepositoryBase<T>,

  ) {
    
    this.logger = new Logger(className);
  }

  public async getById(id: string) {
    return this.repository.findById(id);
  }

  public async getPaginated(page = 0, limit = 10): Promise<PaginatorDTO<T>> {
    return this.repository.findAll(page, limit);
  }

  public async add(item: T): Promise<T> {
    return this.repository.add(item);
  }

  public async delete(id: string): Promise<T> {
    return this.repository.delete(id);
  }

  public async update(id: string, item: T): Promise<T> {
    return this.repository.patch(id, item);
  }
}
