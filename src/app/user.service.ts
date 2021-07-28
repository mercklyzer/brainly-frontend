import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'

  signupUser(user:any): Observable<any>{
    return this.http.post<any>(this.url+'/signup',user, httpOptions)
  }

  loginUser(user:any):Observable<any>{
    return this.http.post<any>(this.url+'/login',user,httpOptions)
  }

}
