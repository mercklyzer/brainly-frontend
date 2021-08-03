import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { QuestionService } from '../question.service';
import { UserService } from '../user.service';
import { dateTimeToDate } from '../utils/utils';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit {
  questions:Question[] = []
  user!:User
  questionObserver:any
  routeObserver:any
  userObserver:any

  constructor(
    private userService:UserService,
    private questionService:QuestionService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.userObserver = this.userService.getUserByUserId(routeParams.userId)
      .subscribe((res) => {
        this.user = res.data
        this.user.birthday = dateTimeToDate(this.user.birthday)

        this.questionObserver = this.questionService.getQuestionsByUser(this.user.userId)
        .subscribe((res) => {
          this.questions = res.data
          console.log(res);
        },
        (err) => {
          console.log(err);
        })

      },
      (err) => console.log(err))
    })



  }

}
