import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { Comment } from './models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  getCommentsOfQuestion(questionId:string): Observable<{data:Comment[]}>{
    return this.http.get<{data:Comment[]}>(this.url+'/questions/'+questionId+'/comments', this.httpOptions)
  }

  getCommentsOfAnswer(questionId:string, answerId:string): Observable<{data:Comment[]}>{
    return this.http.get<{data:Comment[]}>(this.url+'/questions/'+questionId+'/answers/' + answerId + '/comments', this.httpOptions)
  }

  addCommentOfQuestion(questionId:string, comment:{data:Comment}):Observable<{data:Comment}>{
    return this.http.post<{data:Comment}>(this.url+'/questions/'+questionId+'/comments', comment, this.httpOptions)
  }
  
  addCommentOfAnswer(questionId:string, answerId:string, comment:{data:Comment}):Observable<{data:Comment}>{
    return this.http.post<{data:Comment}>(this.url+'/questions/'+questionId+'/answers/'+answerId+'/comments', comment, this.httpOptions)
  }
 

}
