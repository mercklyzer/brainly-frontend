import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from './models/answer.model';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: this.cookieService.get('Token')
    })
  };

  constructor(
    private http: HttpClient,
    private cookieService:CookieService
  ) { }

  private url = 'http://localhost:3000'

  getAnswers(questionId:string): Observable<{data:Answer[]}>{
    return this.http.get<{data:Answer[]}>(this.url+'/questions/'+questionId+'/answers', this.httpOptions)
  }

  postAnswer(questionId:string, answer:{data: Answer}):Observable<{data: Answer}>{
    console.log("sending post request");
    return this.http.post<{data:Answer}>(this.url+'/questions/'+questionId+'/answers', answer, this.httpOptions)
  }


}
