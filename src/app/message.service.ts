import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './models/message.model';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  newMessage = this.socket.fromEvent<Message>('receive message')
  messageTyping = this.socket.fromEvent<boolean>('message typing')

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  private url = 'http://localhost:3000'
    
  getMessages(threadId:string):Observable<{data: Message[]}>{
    return this.http.get<{data: Message[]}>(`${this.url}/threads/${threadId}/messages`)
  }

  addMessage(message:{data:Message}):Observable<{data:Message}>{
    return this.http.post<{data:Message}>(`${this.url}/threads/${message.data.threadId}/messages`, message)
  }

  socketAddMessage(message:Message){
    console.log("socket send message");
    this.socket.emit('send message', message)
  }

  socketMessageTyping(message:Message, boolVal:boolean){
    this.socket.emit('message typing', message, boolVal)
  }

  socketJoinRoom(userId:string){
    this.socket.emit('join', userId)
  }
}
