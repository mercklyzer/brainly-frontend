import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit {
  questions:Question[] = []
  user!:User
  answerObserver:any

  constructor(
    private cookieService:CookieService,
    private questionService:QuestionService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))

    this.answerObserver = this.questionService.getQuestionsByUser(this.user.userId)
    .subscribe((res) => {
      this.questions = res.data
      console.log(res);
    },
    (err) => {
      console.log(err);
    })
  }

}
