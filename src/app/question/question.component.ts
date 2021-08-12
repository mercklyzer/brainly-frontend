import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';
import {relativeDate, titleCase} from '../utils/utils'
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  routeObserver:any
  questionObserver:any
  
  showAnswer:boolean = false
  showComment:boolean = false

  question!:Question
  user!:User

  helper = {
    relativeDate: relativeDate,
    titleCase: titleCase
  }

  isTypingAnswer:boolean = false

  constructor(
    private questionService:QuestionService,
    private answerService:AnswerService,
    private route:ActivatedRoute,
    private router:Router,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    console.log("init");
    this.user = JSON.parse(this.cookieService.get('User'))

    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.questionObserver = this.questionService.getQuestion(routeParams.questionId)
      .subscribe((question) => {
        this.question = question.data
        
        this.questionService.socketLeaveQuestion(this.question.questionId, this.user)
        this.questionService.socketWatchQuestion(this.question, this.user)

        this.answerService.isTypingAnswer.subscribe((boolVal) => {
          this.isTypingAnswer = boolVal
        })


      },
      (err) => {
        console.log(err.error.error.message);
        this.router.navigate(['/dashboard']);
      })
    })
  }

  ngOnDestroy():void{
    this.routeObserver?.unsubscribe()
    this.questionObserver?.unsubscribe()
    this.questionService.socketLeaveQuestion(this.question.questionId, this.user)
  }

  onAnswerClick():void{
    this.showAnswer = true
  }

  onCommentClick():void{
    this.showComment = true
  }

  onDelete():void{
    this.questionObserver = this.questionService.deleteQuestion(this.question.questionId)
    .subscribe((deletedAnswer) => {
      console.log(deletedAnswer);
      this.router.navigate(['/dashboard'])
    },
    (err) => {
      console.log(err.error.error.message);
      this.router.navigate(['/dashboard'])
    })
  }
}
