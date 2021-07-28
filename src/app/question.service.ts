import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './models/question.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'

  getQuestions(subject:string): Observable<{data:Question[]}>{
    if(subject !== 'all'){
      return this.http.get<{data:Question[]}>(this.url+'/subjects/' + subject + '/questions', httpOptions)
    }
    return this.http.get<{data:Question[]}>(this.url+'/questions', httpOptions)
  }

  getQuestion(questionId:string):Observable<{data:Question}>{
    return this.http.get<{data:Question}>(this.url+'/questions/'+questionId, httpOptions)
  }

}
