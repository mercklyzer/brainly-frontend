import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnChanges {
  @Input() questionId:string = ''
  @Input() showAnswer:boolean = false

  answerObserver:any
  answers:Answer[] = []

  constructor(
    private answerService:AnswerService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges():void{
    if(this.showAnswer){
      this.answerObserver = this.answerService.getAnswers(this.questionId)
      .subscribe((answerResponse) => {
        this.answers = answerResponse.data
      })
    }
  }

}
