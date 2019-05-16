import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
// to convert xml responses to json

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  error:string= ''



  constructor(private http:HttpClient) {}
  configUrl:string = 'http://demo.hafas.de/openapi/vbb-proxy/location.name'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/plain; charset=UTF-8',
      'Accept':  'application/xml',
      'Cache-Control':'no-cache',
      responseType: 'text'
    })
  };


  getConfigResponse(param): Observable<HttpResponse<any>> {
    console.log('getting server data')

    let params = new HttpParams()
      .set('accessId','xxxxxyyyyy' )
      .set('input', param);

    return this.http.get<HttpResponse<any>>(
      this.configUrl,  {params} )
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.error= error.error.message
      console.log(this.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );

      this.error= `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      console.log(this.error)
    }
    // return an observable with a user-facing error message
    return throwError(
      "We couldn't retrieve data; please try again later.");
  };
}
