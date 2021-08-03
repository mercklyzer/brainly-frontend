import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'

  signupUser(user:{data: any}): Observable<{data:{user:User, token:string}}>{
    return this.http.post<{data:{user:User, token:string}}>(this.url+'/signup',user)
  }

  loginUser(user:{data:any}):Observable<{data:{user:User, token:string}}>{
    return this.http.post<{data:{user:User, token:string}}>(this.url+'/login',user)
  }

  getUserByUserId(userId:string):Observable<{data:User}>{
    return this.http.get<{data:User}>(this.url+'/users/'+userId)
  }

}
