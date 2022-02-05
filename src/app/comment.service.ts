import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './models/comment.model';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  isTypingComment = this.socket.fromEvent<{questionId:string, answerId:string, isTyping: boolean}>('update typing comment')
  newComments = this.socket.fromEvent<Comment>('new comment')

  constructor(
    private http: HttpClient,
    private socket: Socket
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

  socketJoinRoom(questionId:string){
    this.socket.emit('join question-answer', questionId)
  }

  socketLeaveRoom(questionId:string){
    this.socket.emit('leave question-answer', questionId)
  }

  socketUpdateTypingComment(questionId:string, answerId:string | undefined, boolVal:boolean){
    this.socket.emit('typing comment', questionId, answerId, boolVal)
  }

  socketAddComment(comment:Comment){
    this.socket.emit('add comment', comment)
  }
 

}
