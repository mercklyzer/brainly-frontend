import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { relativeDate, titleCase } from '../utils/utils';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.css']
})
export class UserQuestionComponent implements OnInit {
  @Input() question!:Question

  helper = {
    relativeDate: relativeDate,
    titleCase: titleCase
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.question);
  }

}
