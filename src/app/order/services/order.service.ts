import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { OrderEntity } from '../model/order.entity';
import { OrderStatus } from '../model/order_state.enum';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  options = {}

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndPoint = '/order',
    this.options = {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + AuthUtils.getToken() ?? "",
        "Content-Type": "application/json"
      },
      responseType: 'json'
    }
  }

  //Get All Resources
  getAll(userId: number): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.resourcePath() + "/all/" + userId, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get All Resources
  getAllInline(expertId: number): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.resourcePath() + "/all/inline/" + expertId, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  getOne(orderId: number): Observable<OrderEntity> {
    return this.http.get<OrderEntity>(`${this.resourcePath()}/${orderId}`, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Create Resource
  create(item: {
    title: string,
    estimate: number,
    limit: Date,
    details: string,
    clientId: number,
    state: OrderStatus
  }) {
    return this.http.post<OrderEntity>(this.resourcePath(), item, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  appendDesign(orderId: number, file: FormData){
    return this.http.post<OrderEntity>(this.resourcePath() + "/appendDesign/" + orderId, file, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + AuthUtils.getToken() ?? ""
      }
    })
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update Resource
  update(id: number, item: {
    estimatedPrice: number,
    title: string,
    limitDate: Date,
    details: string
  }) {
    return this.http.put<OrderEntity>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update cancel
  cancel(id: number) {
    return this.http.put(`${this.resourcePath()}/cancel/${id}`, {}, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update finish
  finish(id: number) {
    return this.http.put(`${this.resourcePath()}/finish/${id}`, {}, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update done
  done(id: number) {
    return this.http.put(`${this.resourcePath()}/done/${id}`, {}, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update building
  building(id: number) {
    return this.http.put(`${this.resourcePath()}/built/${id}`, {}, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }
}
