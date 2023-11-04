import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

export class BaseService<T = null> {

  basePath: string = `${environment.basePath}`;
  resourceEndPoint: string = '/resources'

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams(),
  }

  constructor(protected http: HttpClient) {
  }

  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndPoint}`
  }

  handleError(error: HttpErrorResponse) {
    //Default error handling
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      //Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned core ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  // //Get All Resources
  // getAll(): Observable<T> {
  //   return this.http.get<T>(this.resourcePath(), this.httpOptions)
  //     .pipe(retry(2), catchError(this.handleError));
  // }

  // //Create Resource
  // create(item: any){
  //   return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
  //       .pipe(retry(2), catchError(this.handleError));
  // }

  // //Delete Resource
  // delete(id: any){
  //   return this.http.delete(`${this.resourcePath()}/${id}`,  this.httpOptions)
  //       .pipe(retry(2), catchError(this.handleError));
  // }
  // //Update Resource
  // update(id: any, item: any){
  //   return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
  //       .pipe(retry(2), catchError(this.handleError));
  // }
}





