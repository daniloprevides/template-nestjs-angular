
import { Controller, Get, Query, Param, Put, Body, Post, Delete} from "@nestjs/common";
import { ConstantsEnum } from "../constants.enum";
import { PlaceEntity } from "../entities/place.entity";
import { PlaceService } from "../services/place.service";
import { BaseController } from "./base.controller";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaginatorDTO } from "../../common/dto/paginator.dto";
import { PaginationQueryDTO } from "../../common/dto/pagination-query.dto";
import { ResultPaginatorDTO } from "../../common/dto/result-paginator.dto";


@Controller(ConstantsEnum.place)
@ApiTags("Place")
export class PlaceController extends BaseController<PlaceEntity>{

    constructor(protected readonly placeService:PlaceService<PlaceEntity> ){
        super(placeService);
    }

    @Get()
    @ApiOperation({
        summary: "Get All Items (Place)",
        description: "Returns all items according to parameters (Place)",
    })
    @ApiResponse({
        status: 200,
        type: () => ResultPaginatorDTO,
        description: "Pagination Result",
    })
    public getAll(@Query() query: PaginationQueryDTO): Promise<PaginatorDTO<PlaceEntity>> {
        if (!query) query = new PaginationQueryDTO();
        return this.placeService.getPaginated(query.page, query.size);
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get Item by ID (Place)",
        description: "Returns single item by ID (Place)",
    })
    @ApiResponse({
        status: 200,
        description: "Item",
        type: () => PlaceEntity,
    })
    public getItem(@Param("id") id: string): Promise<PlaceEntity> {
        return this.placeService.getById(id);
    }

    @Put(":id")
    @ApiOperation({
        summary: "Update Item by ID (Place)",
        description: "Returns updated item (Place)",
    })
    @ApiResponse({
        status: 200,
        description: "Updated Item",
        type: () => PlaceEntity,
    })
    public update(@Param("id") id: string, @Body() item: PlaceEntity) {
        return this.placeService.update(id, item);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new Item (Place)",
        description: "Returns created item (Place)",
    })
    @ApiResponse({
        status: 201,
        description: "New Item",
        type: () => PlaceEntity,
    })
    public add(@Body() item: PlaceEntity) {
        return this.placeService.add(item);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Deletes an item (Place)",
    })
    @ApiResponse({
        status: 200,
        description: "Deleted item",
        type: () => PlaceEntity,
    })    
    public delete(@Param("id") id: string) {
        return this.placeService.delete(id);
    }

}
