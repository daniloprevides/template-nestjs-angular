import { Get, Query, Put, Body, Param, Post, Delete } from "@nestjs/common";
import { PaginationQueryDTO } from "../../common/dto/pagination-query.dto";
import { ServiceBase } from "../services/services.base";
import { BaseEntity } from "../../common/entities/base.entity";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaginatorDTO } from "../../common/dto/paginator.dto";
import { StoryEntity } from "../entities/story.entity";
import { ResultPaginatorDTO } from "../../common/dto/result-paginator.dto";

export abstract class BaseController<T extends BaseEntity> {
  type: new () => T;

  constructor(private readonly service: ServiceBase<T>) {}

  static activator<T>(type: new () => T): new () => T {
    return type;
  }

  static getEntity<T>(type: new () => T) {
    return type;
  }

  @Get()
  @ApiOperation({
    summary: "Get All Items",
    description: "Returns all items according to parameters",
  })
  @ApiResponse({
    status: 200,
    type: () => ResultPaginatorDTO,
    description: "Pagination Result",
  })
  public getAll(@Query() query: PaginationQueryDTO): Promise<PaginatorDTO<T>> {
    if (!query) query = new PaginationQueryDTO();
    return this.service.getPaginated(query.page, query.size);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get Item by ID",
    description: "Returns single item by ID",
  })
  @ApiResponse({
    status: 200,
    description: "Item",
    type: () => BaseEntity,
  })
  public getItem(@Param("id") id: string): Promise<T> {
    return this.service.getById(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update Item by ID",
    description: "Returns updated item",
  })
  @ApiResponse({
    status: 200,
    description: "Updated Item",
    type: () => BaseEntity,
  })
  public update(@Param("id") id: string, @Body() item: T) {
    return this.service.update(id, item);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new Item",
    description: "Returns created item",
  })
  @ApiResponse({
    status: 201,
    description: "New Item",
    type: () => BaseEntity,
  })
  public add(@Body() item: T) {
    return this.service.add(item);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deletes an item (Characters)",
  })
  @ApiResponse({
    status: 200,
    description: "Deleted item",
    type: () => BaseEntity,
  })
  public delete(@Param("id") id: string) {
    return this.service.delete(id);
  }
}
