import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Answer } from '../models/answer.model';
import * as moment from 'moment'
import { AnswerService } from '../services/answer.service';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnDestroy {
  @Input() answer!:Answer
  @Input() question!:Question
  @Output() thankEmitter = new EventEmitter<{questionId:string, answerId:string}>()
  user!:User
  
  showComment:boolean = false

  constructor(
    private cookieService:CookieService,
    private answerService:AnswerService
  ) { }

  private subscriptions = new Subscription()

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  onCommentClick():void{
    this.showComment = true
  }

  onThank():void{
    console.log(this.answer.isUserThanked);
    if(this.answer.isUserThanked === 0){
      this.subscriptions.add(this.answerService.addThank(this.question.questionId,this.answer.answerId)
      .subscribe((res) => {
        console.log(res);
        this.answer.thanksCtr++;
        this.answer.isUserThanked = 1;
      },
      (err) => {
        console.log(err);
      }))
    }
  }

  onSetBrainliest():void{
    if(this.question.username === this.user.username ){
      this.subscriptions.add(this.answerService.setBrainliest(this.question.questionId, this.answer.answerId)
      .subscribe((res) => {
        console.log(res);
        this.answer.isBrainliest = 1;
        this.question.hasBrainliest = 1;
      },
      (err) => {
        console.log(err);
      }))
    }
  }

  relativeDate = (time:number):string => moment(time).fromNow()
}
