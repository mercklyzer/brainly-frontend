import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from './models/answer.model';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://localhost:3000'

  getAnswers(questionId:string): Observable<{data:Answer[]}>{
    return this.http.get<{data:Answer[]}>(this.url+'/questions/'+questionId+'/answers')
  }

  postAnswer(questionId:string, answer:{data: Answer}):Observable<{data: Answer}>{
    console.log("sending post request");
    return this.http.post<{data:Answer}>(this.url+'/questions/'+questionId+'/answers', answer)
  }


}
