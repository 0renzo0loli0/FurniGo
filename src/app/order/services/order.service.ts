import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { OrderEntity } from '../model/order.entity';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndPoint = '/orders'
   }

  //Get All Resources
  getAll(): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getOne(id: number): Observable<OrderEntity> {
    return this.http.get<OrderEntity>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Create Resource
  create(item: any){
    return this.http.post<OrderEntity>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  //Delete Resource
  delete(id: any){
    return this.http.delete(`${this.resourcePath()}/${id}`,  this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  //Update Resource
  update(id: number, item: any){
    return this.http.put<OrderEntity>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
