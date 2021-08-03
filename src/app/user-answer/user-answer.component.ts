import { Component, Input, OnInit } from '@angular/core';
import { Answer } from '../models/answer.model';
import { relativeDate, titleCase } from '../utils/utils';

@Component({
  selector: 'app-user-answer',
  templateUrl: './user-answer.component.html',
  styleUrls: ['./user-answer.component.css']
})
export class UserAnswerComponent implements OnInit {
  @Input() answer!:Answer

  helper = {
    relativeDate: relativeDate,
    titleCase: titleCase
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.answer.questionId);
  }

}
