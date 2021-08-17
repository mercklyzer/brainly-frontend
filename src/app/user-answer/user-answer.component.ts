import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Answer } from '../models/answer.model';
import { User } from '../models/user.model';
import { relativeDate, titleCase } from '../utils/utils';

@Component({
  selector: 'app-user-answer',
  templateUrl: './user-answer.component.html',
  styleUrls: ['./user-answer.component.css']
})
export class UserAnswerComponent implements OnInit {
  @Input() answer!:Answer
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
  }

}
