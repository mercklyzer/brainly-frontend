import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './models/question.model';
import { Socket } from 'ngx-socket-io';
import { User } from './models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  newWatchers = this.socket.fromEvent<{questionId: string, watchers:User[]}>('receive watcher')
  newQuestion = this.socket.fromEvent<Question>('new question')

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  private url = environment.apiUrl

  getQuestions(subject:string,offset:number): Observable<{data:Question[]}>{
    if(subject !== 'all'){
      return this.http.get<{data:Question[]}>(this.url+'/subjects/' + subject + '/questions?offset='+offset)
    }
    return this.http.get<{data:Question[]}>(this.url+'/questions?offset='+offset)
  }

  getQuestionsByUser(userId:string, offset:number): Observable<{data:Question[]}>{
    return this.http.get<{data:Question[]}>(`${this.url}/users/${userId}/questions?offset=${offset}`)
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

  socketWatchQuestion(question:Question, user:User){
    this.socket.emit('watch question', question, user)
  }

  socketJoinRoom(questionId:string){
    this.socket.emit('join question', questionId)
  }

  socketLeaveQuestion(questionId:string, user:User){
    this.socket.emit('leave question',questionId, user)
  }

  socketJoinSubject(subject:string){
    this.socket.emit('join subject', subject)
  }

  socketLeaveSubject(subject: string){
    this.socket.emit('leave subject', subject)
  }

  socketAddQuestion(question:Question){
    this.socket.emit('add question', question)
  }

}
