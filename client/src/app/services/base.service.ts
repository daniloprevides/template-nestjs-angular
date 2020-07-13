import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ResultPaginatorDTO} from '../../app/dto/result-paginator.dto';
import {PaginatorDTO} from '../../app/dto/paginator.dto';
import {PaginationQueryDTO} from '../../app/dto/pagination-query.dto';
import {ResultDTO} from '../../app/dto/result.dto';

export class BaseService {
  constructor(private http: HttpClient,protected path:string) {

  }

  private getParamsAsUrl(params: any) {
    let paramsUrl = "";
    if (params) {
      const parsedParams = Object.keys(params)
        .map(function(k) {
          if (params[k] != null) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
          }
        })
        .join("&");
      if (parsedParams && parsedParams.length) {
        paramsUrl += `?${parsedParams}`;
      }
    }

    return paramsUrl;
  }

  protected async getAll<T>(path:string = this.path,params?:PaginationQueryDTO) : Promise<ResultPaginatorDTO<T>>{
    const url = `${environment.apiUrl}/${path}${params ? this.getParamsAsUrl(params) : ''}`;
    return this.http.get<ResultPaginatorDTO<T>>(url).toPromise();
  }

  protected async get<T>(path:string = this.path) : Promise<T>{
    const url = `${environment.apiUrl}/${path}`;
    return this.http.get<T>(url).toPromise();
  }

  protected async add<T>(path:string = this.path, item:T) : Promise<T>{
    const url = `${environment.apiUrl}/${path}`;
    return this.http.post<T>(url, item).toPromise();
  }

  protected async update<T>(id:string,path:string = this.path, item:T) : Promise<T>{
    const url = `${environment.apiUrl}/${path}/${id}`;
    return this.http.put<T>(url, item).toPromise();
  }

  protected async delete<T>(id:string,path:string = this.path) : Promise<T>{
    const url = `${environment.apiUrl}/${path}/${id}`;
    return this.http.delete<T>(url).toPromise();
  }

}
