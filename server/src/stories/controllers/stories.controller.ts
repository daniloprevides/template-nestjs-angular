import { Controller, Get, Query, Param, Put, Body, Post, Delete, NotFoundException} from "@nestjs/common";
import { ConstantsEnum } from "../constants.enum";
import { StoryEntity } from "../entities/story.entity";
import { BaseController } from "./base.controller";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import {StoriesService} from '../services/stories.service';
import { PaginatorDTO } from "../../common/dto/paginator.dto";
import { PaginationQueryDTO } from "../../common/dto/pagination-query.dto";
import { ResultDTO } from "../../common/dto/result.dto";
import { ResultPaginatorDTO } from "../../common/dto/result-paginator.dto";

@Controller(ConstantsEnum.story)
@ApiTags("stories")
export class StoriesController extends BaseController<StoryEntity>{

    constructor(private readonly storiesService:StoriesService<StoryEntity> ){
        super(storiesService);
    }

    @Get()
    @ApiOperation({
        summary: "Get All Items (Story)",
        description: "Returns all items according to parameters (Story)",
    })
    @ApiResponse({
        status: 200,
        type: () => ResultPaginatorDTO,
        description: "Pagination Result",
    })
    public getAll(@Query() query: PaginationQueryDTO): Promise<PaginatorDTO<StoryEntity>> {
        if (!query) query = new PaginationQueryDTO();
        return this.storiesService.getPaginated(query.page, query.size);
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get Item by ID (Story)",
        description: "Returns single item by ID (Story)",
    })
    @ApiResponse({
        status: 200,
        description: "Item",
        type: () => StoryEntity,
    })
    public getItem(@Param("id") id: string): Promise<StoryEntity> {
        return this.storiesService.getById(id);
    }

    @Put(":id")
    @ApiOperation({
        summary: "Update Item by ID (Story)",
        description: "Returns updated item (Story)",
    })
    @ApiResponse({
        status: 200,
        description: "Updated Item",
        type: () => StoryEntity,
    })
    public update(@Param("id") id: string, @Body() item: StoryEntity) {
        return this.storiesService.update(id, item);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new Item (Story)",
        description: "Returns created item (Story)",
    })
    @ApiResponse({
        status: 201,
        description: "New Item",
        type: () => StoryEntity,
    })
    public add(@Body() item: StoryEntity) {
        return this.storiesService.add(item);
    }

    @ApiOperation({
        summary: "Deletes an item (Story)"
    })
    @ApiResponse({
        status: 200,
        description: "Deleted item",
        type: () => StoryEntity,
    })
    @Delete(":id")
    public delete(@Param("id") id: string) {
        return this.storiesService.delete(id);
    }

}
