export class ResultDTO<T>{
    error:boolean;
    timestamp: string;
    path: string;
    data: T;
}
