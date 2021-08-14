import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { Thread } from './models/thread.model';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  newThread = this.socket.fromEvent<Thread>('receive thread')

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  private url = environment.apiUrl
    
  addThread(user:User):Observable<{data: {threadId: string}}>{
    return this.http.post<{data: {threadId: string}}>(this.url+'/threads',{data: user})
  }

  getThreads():Observable<{data: Thread[]}>{
    return this.http.get<{data: Thread[]}>(`${this.url}/threads`)
  }

  getThread(threadId:string):Observable<{data: Thread}>{
    return this.http.get<{data: Thread}>(`${this.url}/threads/${threadId}`)
  }

  socketUpdateThread(thread:Thread){
    this.socket.emit('update thread', thread)
  }

}
