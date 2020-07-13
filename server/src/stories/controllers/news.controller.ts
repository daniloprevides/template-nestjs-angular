
import { Controller, Get, Query, Param, Put, Body, Post, Delete} from "@nestjs/common";
import { ConstantsEnum } from "../constants.enum";
import { NewsEntity } from "../entities/news.entity";
import { NewsService } from "../services/news.service";
import { BaseController } from "./base.controller";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaginatorDTO } from "../../common/dto/paginator.dto";
import { PaginationQueryDTO } from "../../common/dto/pagination-query.dto";
import { ResultPaginatorDTO } from "../../common/dto/result-paginator.dto";


@Controller(ConstantsEnum.news)
@ApiTags("News")
export class NewsController extends BaseController<NewsEntity>{

    constructor(protected readonly newsService:NewsService<NewsEntity> ){
        super(newsService);
    }

    @Get()
    @ApiOperation({
        summary: "Get All Items (News)",
        description: "Returns all items according to parameters (News)",
    })
    @ApiResponse({
        status: 200,
        type: () => ResultPaginatorDTO,
        description: "Pagination Result",
    })
    public getAll(@Query() query: PaginationQueryDTO): Promise<PaginatorDTO<NewsEntity>> {
        if (!query) query = new PaginationQueryDTO();
        return this.newsService.getPaginated(query.page, query.size);
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get Item by ID (News)",
        description: "Returns single item by ID (News)",
    })
    @ApiResponse({
        status: 200,
        description: "Item",
        type: () => NewsEntity,
    })
    public getItem(@Param("id") id: string): Promise<NewsEntity> {
        return this.newsService.getById(id);
    }

    @Put(":id")
    @ApiOperation({
        summary: "Update Item by ID (News)",
        description: "Returns updated item (News)",
    })
    @ApiResponse({
        status: 200,
        description: "Updated Item",
        type: () => NewsEntity,
    })
    public update(@Param("id") id: string, @Body() item: NewsEntity) {
        return this.newsService.update(id, item);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new Item (News)",
        description: "Returns created item (News)",
    })
    @ApiResponse({
        status: 201,
        description: "New Item",
        type: () => NewsEntity,
    })
    public add(@Body() item: NewsEntity) {
        return this.newsService.add(item);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Deletes an item (News)",
    })
    @ApiResponse({
        status: 200,
        description: "Deleted item",
        type: () => NewsEntity,
    })    
    public delete(@Param("id") id: string) {
        return this.newsService.delete(id);
    }

}
