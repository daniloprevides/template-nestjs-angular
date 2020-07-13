
import { Controller, Get, Query, Param, Put, Body, Post, Delete, UseGuards} from "@nestjs/common";
import { ConstantsEnum } from "../constants.enum";
import { CharactersEntity } from "../entities/characters.entity";
import { CharactersService } from "../services/characters.service";
import { BaseController } from "./base.controller";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaginatorDTO } from "../../common/dto/paginator.dto";
import { PaginationQueryDTO } from "../../common/dto/pagination-query.dto";
import { ResultDTO } from "../../common/dto/result.dto";
import { ResultPaginatorDTO } from "../../common/dto/result-paginator.dto";
import { NeedScope } from "../../common/guard/scope-metadata.guard";
import { SecurityGuard } from "../../common/guard/security.guard";


@Controller(ConstantsEnum.characters)
@ApiTags("Characters")
export class CharactersController extends BaseController<CharactersEntity>{

    constructor(protected readonly charactersService:CharactersService<CharactersEntity> ){
        super(charactersService);
    }

    @Get()
    @ApiOperation({        
        summary: "Get All Items (Characters)",
        description: "Returns all items according to parameters (Characters)",
    })
    @ApiResponse({
        status: 200,        
        type: () => ResultPaginatorDTO,
        description: "Pagination Result"        
    })
    @NeedScope('*','trata')
    @UseGuards(SecurityGuard)
    public getAll(@Query() query: PaginationQueryDTO): Promise<PaginatorDTO<CharactersEntity>> {
        if (!query) query = new PaginationQueryDTO();
        return this.charactersService.getPaginated(query.page, query.size);
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get Item by ID (Characters)",
        description: "Returns single item by ID (Characters)",
    })
    @ApiResponse({
        status: 200,
        description: "Item",
        type: () => CharactersEntity,
    })
    public getItem(@Param("id") id: string): Promise<CharactersEntity> {
        return this.charactersService.getById(id);
    }

    @Put(":id")
    @ApiOperation({
        summary: "Update Item by ID (Characters)",
        description: "Returns updated item (Characters)",
    })
    @ApiResponse({
        status: 200,
        description: "Updated Item",
        type: () => CharactersEntity,
    })
    public update(@Param("id") id: string, @Body() item: CharactersEntity) {
        return this.charactersService.update(id, item);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new Item (Characters)",
        description: "Returns created item (Characters)",
    })
    @ApiResponse({
        status: 201,
        description: "New Item",
        type: () => CharactersEntity,
    })
    public add(@Body() item: CharactersEntity) {
        return this.charactersService.add(item);
    }

    @ApiOperation({
        summary: "Deletes an item (Characters)"
    })
    @ApiResponse({
        status: 200,
        description: "Deleted item",
        type: () => CharactersEntity,
    })
    @Delete(":id")
    public delete(@Param("id") id: string) {
        return this.charactersService.delete(id);
    }

}
