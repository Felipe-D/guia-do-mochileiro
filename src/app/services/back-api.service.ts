import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackApiService {

  private apiUrl = 'https://api-back-master-p8beq8w6rg9phu.herokuapp.com/api/';
  private tok = "?access_token=";

  private sessionId: string;
  constructor( private http: HttpClient) { }

  setId(id:string){
    this.sessionId = id;
  }
  getId(){
    return this.sessionId;
  }

  login(body:object): Observable<any>{
    return this.http.post<any>(this.apiUrl+'Users/login',body).pipe(
      catchError(this.handleError<object>('login'))
    );
  }
  logout(token: string): Observable<any>{
    return this.http.post<any>(this.apiUrl+'Users/logout'+this.tok+this.sessionId,'').pipe(
      catchError(this.handleError<object>('logout'))
    );
  }
  postUser(body:object): Observable<any>{
    return this.http.post<any>(this.apiUrl+'Users'+this.tok+this.sessionId,body).pipe(
      catchError(this.handleError<object>('postUser'))
    );
  }
  getHistories(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'histories'+this.tok+this.sessionId).pipe(
      catchError(this.handleError<object>('getHistorie'))
    );
  }
  postHistories(body:object): Observable<any>{
    return this.http.post<any>(this.apiUrl+'histories'+this.tok+this.sessionId,body).pipe(
      catchError(this.handleError<object>('postHistorie'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(error.error.error);
    };
  }
}
