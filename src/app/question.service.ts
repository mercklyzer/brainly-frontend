import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './models/question.model';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
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

  getQuestions(subject:string): Observable<{data:Question[]}>{
    if(subject !== 'all'){
      return this.http.get<{data:Question[]}>(this.url+'/subjects/' + subject + '/questions', this.httpOptions)
    }
    return this.http.get<{data:Question[]}>(this.url+'/questions', this.httpOptions)
  }

  getQuestion(questionId:string):Observable<{data:Question}>{
    return this.http.get<{data:Question}>(this.url+'/questions/'+questionId, this.httpOptions)
  }

postQuestion(question:{data: Question}):Observable<{data: Question}>{
    return this.http.post<{data:Question}>(this.url+'/questions', question, this.httpOptions)
  }

}
