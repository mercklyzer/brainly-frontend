import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = environment.apiUrl

  signupUser(formData:any): Observable<{data:{user:User, token:string}}>{
    return this.http.post<{data:{user:User, token:string}}>(this.url+'/signup',formData)
  }

  loginUser(user:{data:any}):Observable<{data:{user:User, token:string}}>{
    return this.http.post<{data:{user:User, token:string}}>(this.url+'/login',user)
  }

  getUserByUserId(userId:string):Observable<{data:User}>{
    return this.http.get<{data:User}>(this.url+'/users/'+userId)
  }

  uploadImage(data:FormData):Observable<{data:string}>{
    console.log(data);

    return this.http.post<{data:string}>(this.url+'/files',data)
  }

}
