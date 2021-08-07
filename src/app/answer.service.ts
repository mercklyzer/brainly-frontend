import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from './models/answer.model';
import { Thank } from './models/thank.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'

  getAnswers(questionId:string, offset:number): Observable<{data:Answer[]}>{
    return this.http.get<{data:Answer[]}>(this.url+'/questions/'+questionId+'/answers?offset='+offset)
  }

  getAnswersByUser(userId:string, offset:number):Observable<{data:Answer[]}>{
    return this.http.get<{data:Answer[]}>(`${this.url}/users/${userId}/answers?offset=${offset}`);
  }

  postAnswer(questionId:string, answer:{data: Answer}):Observable<{data: Answer}>{
    return this.http.post<{data:Answer}>(this.url+'/questions/'+questionId+'/answers', answer)
  }

  addThank(questionId:string, answerId:string): Observable<{data: Thank}>{
    return this.http.post<{data: Thank}>(`${this.url}/questions/${questionId}/answers/${answerId}/thank`,{})
  }

  setBrainliest(questionId:string, answerId:string):Observable<{data:string}>{
    return this.http.post<{data: string}>(`${this.url}/questions/${questionId}/answers/${answerId}/brainliest`,{})
  }


}
