import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './models/question.model';

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
      return this.http.get<{data:Question[]}>(this.url+'/subjects/' + subject + '/questions')
    }
    return this.http.get<{data:Question[]}>(this.url+'/questions')
  }

  getQuestionsByUser(userId:string): Observable<{data:Question[]}>{
    return this.http.get<{data:Question[]}>(`${this.url}/users/${userId}/questions`)
  }

  getQuestion(questionId:string):Observable<{data:Question}>{
    return this.http.get<{data:Question}>(this.url+'/questions/'+questionId)
  }

  postQuestion(question:{data: Question}):Observable<{data: Question}>{
    return this.http.post<{data:Question}>(this.url+'/questions', question)
  }

  editQuestion(questionId:string, newQuestion:{data: {newQuestion:string}}):Observable<{data: Question}>{
    return this.http.put<{data:Question}>(this.url+'/questions/'+ questionId, newQuestion)
  }

  deleteQuestion(questionId:string):Observable<{data: Question}>{
    return this.http.delete<{data:Question}>(this.url+'/questions/'+questionId)
  }

}
