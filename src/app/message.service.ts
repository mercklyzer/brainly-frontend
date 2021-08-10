import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'
    


  getMessages(threadId:string):Observable<{data: Message[]}>{
    return this.http.get<{data: Message[]}>(`${this.url}/threads/${threadId}/messages`)
  }

  addMessage(message:{data:Message}):Observable<{data:Message}>{
    return this.http.post<{data:Message}>(`${this.url}/threads/${message.data.threadId}/messages`, message)
  }

}
