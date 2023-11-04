import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { UserEntity } from '../model/user.entity';
import { Observable, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndPoint = "/users"
   }


  //Get All Resources
  getAll(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getOne(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Create Resource
  create(item: any){
    return this.http.post<UserEntity>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  //Delete Resource
  delete(id: any){
    return this.http.delete(`${this.resourcePath()}/${id}`,  this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  //Update Resource
  update(id: number, item: any){
    return this.http.put<UserEntity>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
