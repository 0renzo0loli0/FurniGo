import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { OfferEntity } from '../model/offer-entity';
import { UserEntity } from 'src/app/user/model/user.entity';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends BaseService{

  options = {}

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndPoint = "/offer"
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
  getAll(orderId: number): Observable<Array<{
      offer: OfferEntity,
      user: UserEntity
    }>> {
    return this.http.get<Array<{
      offer: OfferEntity,
      user: UserEntity
    }>>(this.resourcePath() + "/allFromOrder/" + orderId, this.options)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Create Resource
  create(item: {
    orderId: number,
    expertId: number,
    price: 0,
    date: Date
  }){
    return this.http.post(this.resourcePath(), JSON.stringify(item), this.options)
        .pipe(retry(2), catchError(this.handleError));
  }

  //Update Resource
  accept(id: number){
    return this.http.put(`${this.resourcePath()}/${id}`, {}, this.options)
        .pipe(retry(2), catchError(this.handleError));
  }
}
