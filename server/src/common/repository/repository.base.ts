import { Repository, FindManyOptions } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { NotFoundException, Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { PaginatorDTO } from "../../common/dto/paginator.dto";

@Injectable()
export class RepositoryBase<T extends BaseEntity> extends Repository<T> {

    constructor(protected readonly i18n: I18nService){
        super();
    }

    async findById(id:string) : Promise<T>{
        return this.findOne(id, {
            where: {
                active: true,
            },
            relations: this.getRelations()
        })
    }

    async findAll(page:number = 0, size:number = 1000) : Promise<PaginatorDTO<T>>{
        const options = {
            where: {
                active: true
            },
            relations: this.getRelations()
        } as FindManyOptions;

        const totalOptions = Object.assign({}, options);

        if (page != null){
            options.skip = size * page;
        }

        if (size != null){
            options.take = size;
        }

        const [items, total] = await Promise.all([
            this.find(options),
            this.count(totalOptions)
        ])

        const paginationResult = {
            items: items,
            total: total,
        } as PaginatorDTO<T>;


        const totalPages = !page ? 0 : Math.abs(total / size);
        const nextPage = page + 1;
        const lastPage = page - 1;
        paginationResult.totalPages = totalPages;
        paginationResult.nextPageParams = nextPage <= totalPages ? `page=${nextPage}&size=${size}`: null;
        paginationResult.lastPageParams = lastPage >= 0 ? `page=${lastPage}&size=${size}`: null;        


        return paginationResult;
    }

    async add(item: T){
        return await this.save(item as any);
    }

    async delete(id: string){
        return await this.delete(id);
    }

    async patch(id: string, item:T) : Promise<T>{
        const foundItem = await this.findById(id);
        if (!foundItem || !item){
            throw new NotFoundException(this.i18n.translate('ITEM_NOT_FOUND'));
        }

        Object.keys(item).forEach(i => {
            if (i != 'id'){
                foundItem[i] = item[i];
            }
        });

        return await this.save(foundItem as any);
    }

    protected getRelations() : string[]{
        return [];
    }
}