import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Answer } from '../models/answer.model';
import * as utils from '../utils/utils';
import * as moment from 'moment'
import { AnswerService } from '../answer.service';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie';
import { Thank } from '../models/thank.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer!:Answer
  @Input() question!:Question
  @Output() thankEmitter = new EventEmitter<{questionId:string, answerId:string}>()
  user!:User
  
  showComment:boolean = false
  answerObserver:any

  constructor(
    private cookieService:CookieService,
    private answerService:AnswerService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
  }

  onCommentClick():void{
    this.showComment = true
  }

  onThank():void{
    console.log(this.answer.isUserThanked);
    if(this.answer.isUserThanked === 0){
      // this.thankEmitter.emit({questionId: this.question.questionId, answerId:this.answer.answerId})
      this.answerObserver = this.answerService.addThank(this.question.questionId,this.answer.answerId)
      .subscribe((res) => {
        console.log(res);
        this.answer.thanksCtr++;
        this.answer.isUserThanked = 1;
      },
      (err) => {
        console.log(err);
      })
    }
  }

  onSetBrainliest():void{
    if(this.question.username === this.user.username ){
      this.answerObserver = this.answerService.setBrainliest(this.question.questionId, this.answer.answerId)
      .subscribe((res) => {
        console.log(res);
        this.answer.isBrainliest = 1;
        this.question.userBrainliest = this.user.userId;
      },
      (err) => {
        console.log(err);
      })
    }
  }

  relativeDate = (time:number):string => moment(time).fromNow()
}
