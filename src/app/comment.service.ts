import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './models/comment.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {



  constructor(
    private http: HttpClient,
  ) { }

  private url = environment.apiUrl

  getCommentsOfQuestion(questionId:string, offset:number): Observable<{data:Comment[]}>{
    return this.http.get<{data:Comment[]}>(this.url+'/questions/'+questionId+'/comments?offset='+offset)
  }

  getCommentsOfAnswer(questionId:string, answerId:string, offset:number): Observable<{data:Comment[]}>{
    return this.http.get<{data:Comment[]}>(this.url+'/questions/'+questionId+'/answers/' + answerId + '/comments?offset='+offset)
  }

  addCommentOfQuestion(questionId:string, comment:{data:Comment}):Observable<{data:Comment}>{
    return this.http.post<{data:Comment}>(this.url+'/questions/'+questionId+'/comments', comment)
  }
  
  addCommentOfAnswer(questionId:string, answerId:string, comment:{data:Comment}):Observable<{data:Comment}>{
    return this.http.post<{data:Comment}>(this.url+'/questions/'+questionId+'/answers/'+answerId+'/comments', comment)
  }
 

}
