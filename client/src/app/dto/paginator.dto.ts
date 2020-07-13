export class PaginatorDTO<T>{
    total:number;
    totalPages?:number;
    nextPageParams?:string;
    lastPageParams?:string;
    items: T[]
}
