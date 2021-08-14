import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnChanges {
  @Input() question!:Question
  @Input() showAnswer:boolean = false

  answerObserver:any
  answers:Answer[] = []
  // newAnswers:Answer[] = []

  offset:number = 0
  disableLoad:boolean = false
  requestOnProcess:boolean = false

  constructor(
    private answerService:AnswerService
  ) { }

  ngOnInit(): void {
    this.answerService.socketJoinRoom(this.question.questionId)

    this.answerService.newAnswers.subscribe(newAnswer => {
      console.log("new answer received");
      console.log(newAnswer);
      // this.newAnswers.push(newAnswer)
      this.answers.push(newAnswer)
    })

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
        console.log(this.answers);
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

        console.log(this.answers);
      })
    }

    
  }

}
