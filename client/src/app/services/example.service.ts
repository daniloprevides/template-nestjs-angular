import {Injectable} from '@angular/core/core';
import {BaseService} from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends BaseService{
  constructor(protected readonly httpClient:HttpClient){
    super(httpClient,'example');
  }
}
