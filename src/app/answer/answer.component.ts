import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnChanges {
  @Input() showAnswer:boolean = false


  constructor(
    private answerService:AnswerService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    this.showAnswer = changes.showAnswer.currentValue
  }

}
