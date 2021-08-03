import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit {
  answers:Answer[] = []
  user!:User
  answerObserver:any

  constructor(
    private cookieService:CookieService,
    private answerService:AnswerService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))

    this.answerObserver = this.answerService.getAnswersByUser(this.user.userId)
    .subscribe((res) => {
      console.log(res);
    })
  }

}
