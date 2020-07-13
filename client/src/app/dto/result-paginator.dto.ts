import { PaginatorDTO } from "./paginator.dto";

export class ResultPaginatorDTO<T>{
    error:boolean;
    timestamp: string;
    path: string;
    data: PaginatorDTO<T>;
}
