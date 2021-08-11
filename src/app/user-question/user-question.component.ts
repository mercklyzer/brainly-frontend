import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { relativeDate, titleCase } from '../utils/utils';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.css']
})
export class UserQuestionComponent implements OnInit {
  @Input() question!:Question
  user!:User
  helper = {
    relativeDate: relativeDate,
    titleCase: titleCase
  }

  constructor(
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
    console.log(this.question);
  }

}
