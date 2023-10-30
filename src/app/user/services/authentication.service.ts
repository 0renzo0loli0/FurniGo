import { Injectable } from '@angular/core';
import { UserEntity } from '../model/user.entity';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  basePath: string = "http://localhost:3000/api/v1"
  // currentUser: UserEntity

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (!(error.error instanceof ErrorEvent)) {
      console.error('Backend returned code ' + error.status + ", body was: " + error.error)
    }
    console.log("An error occurred: " + error.message)

    return throwError(
      ()=> new Error("Something happended with request, please try again later")
    )
  }

  signUp(user: UserEntity): Observable<any>{
    return this.http.post(`${this.basePath}/sign-up`, user).pipe(retry(2), catchError(this.handleError));
  }

  signIn(user: UserEntity): Observable<any>{
    return this.http.post(`${this.basePath}/sign-in`, user).pipe(retry(2), catchError(this.handleError));
  }
}
