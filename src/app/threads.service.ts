import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { Thread } from './models/thread.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'
    
  addThread(user:User):Observable<{data: {threadId: string}}>{
    console.log("before sending a post request");
    return this.http.post<{data: {threadId: string}}>(this.url+'/threads',{data: user})
  }

  getThreads():Observable<{data: Thread[]}>{
    return this.http.get<{data: Thread[]}>(`${this.url}/threads`)
  }

  getThread(threadId:string):Observable<{data: Thread}>{
    return this.http.get<{data: Thread}>(`${this.url}/threads/${threadId}`)
  }


}
