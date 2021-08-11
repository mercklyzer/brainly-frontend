import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
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

  signupUser(formData:any): Observable<{data:{user:User, token:string}}>{
    return this.http.post<{data:{user:User, token:string}}>(this.url+'/signup',formData)
  }

  loginUser(user:{data:any}):Observable<{data:{user:User, token:string}}>{
    return this.http.post<{data:{user:User, token:string}}>(this.url+'/login',user)
  }

  getUserByUserId(userId:string):Observable<{data:User}>{
    return this.http.get<{data:User}>(this.url+'/users/'+userId)
  }

  uploadImage(data:FormData):Observable<HttpEvent<any>>{
    console.log(data);

    const req = new HttpRequest('POST', this.url+'/files', data, {
      reportProgress: true,
      responseType: 'json',
    })

    return this.http.request(req)
    // return this.http.post<any>(this.url+'/files', data, {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'multipart/form-data; boundary=abcdef-ghijkl-mnopq-r-s-t-u---v',
    //     responseType: 'json',
    //     reportProgress: 'true'
    //   }),
    // }
    // )
  }

}
