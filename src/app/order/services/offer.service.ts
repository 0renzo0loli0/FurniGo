import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { OfferEntity } from '../model/offer-entity';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndPoint = "/offers"
   }

  //Get All Resources
  getAll(): Observable<OfferEntity[]> {
    return this.http.get<OfferEntity[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getOne(id: number): Observable<OfferEntity> {
    return this.http.get<OfferEntity>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Create Resource
  create(item: any){
    return this.http.post<OfferEntity>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  //Delete Resource
  delete(id: any){
    return this.http.delete(`${this.resourcePath()}/${id}`,  this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  //Update Resource
  update(id: number, item: any){
    return this.http.put<OfferEntity>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
