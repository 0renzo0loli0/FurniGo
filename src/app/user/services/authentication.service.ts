import { Injectable } from '@angular/core';
import { UserEntity } from '../model/user.entity';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(http: HttpClient) { 
    super(http)
    this.resourceEndPoint = "/auth"
  }

  signUp(user: UserEntity): Observable<any>{
    return this.http.post(`${this.resourcePath()}/sign-up`, user).pipe(retry(2), catchError(this.handleError));
  }

  signIn(user: UserEntity): Observable<any>{
    return this.http.post(`${this.resourcePath()}/login`, user).pipe(retry(2), catchError(this.handleError));
  }
}
