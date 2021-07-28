import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './models/comment.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'

  getCommentsOfQuestion(questionId:string): Observable<{data:Comment[]}>{
    return this.http.get<{data:Comment[]}>(this.url+'/questions/'+questionId+'/comments', httpOptions)
  }

  // getCommentsOfAnswer(questionId:string): Observable<{data:Comment}>{
  //   return this.http.get<{data:Question[]}>(this.url+'/questions', httpOptions)
  // }

 

}
