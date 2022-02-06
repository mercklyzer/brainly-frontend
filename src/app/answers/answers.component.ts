import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnChanges, OnDestroy {
  @Input() question!:Question
  @Input() showAnswer:boolean = false

  answerObserver:any
  newAnswersObserver:any
  answers:Answer[] = []

  offset:number = 0
  disableLoad:boolean = false
  requestOnProcess:boolean = false

  constructor(
    private answerService:AnswerService
  ) { }

    contentLoad:boolean = false

  ngOnInit(): void {
    this.answerService.socketJoinRoom(this.question.questionId)

    this.newAnswersObserver = this.answerService.newAnswers.subscribe(newAnswer => {
      this.answers.push(newAnswer)
    })
  }

  ngOnDestroy(): void {
    this.answerService.socketLeaveRoom(this.question.questionId)
    this.newAnswersObserver?.unsubscribe()
    this.answerObserver?.unsubscribe()
  }

  ngOnChanges():void{
    if(this.showAnswer){
      this.requestOnProcess = true
      this.answerObserver = this.answerService.getAnswers(this.question.questionId, this.offset)
      .subscribe((answerResponse) => {
        this.answers = answerResponse.data
        if(this.answers.length !== 5){
          this.disableLoad = true
        }
        this.requestOnProcess = false
        this.offset += 5
        this.contentLoad = true
      })
    }
  }

  loadMore(){
    if(!this.disableLoad && !this.requestOnProcess && this.answers.length !== 0){
      this.requestOnProcess = true

      this.answerObserver = this.answerService.getAnswers(this.question.questionId, this.offset)
      .subscribe((answerResponse) => {
        this.answers = this.answers.concat(answerResponse.data)
        this.requestOnProcess = false
        this.offset += 5

        if(answerResponse.data.length !== 5){
          this.disableLoad = true
        }
      })
    }

    
  }

}
