import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AnswerService } from '../answer.service';
import { Answer } from '../models/answer.model';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { dateTimeToDate } from '../utils/utils';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit {
  answers:Answer[] = []
  user!:User
  answerObserver:any
  userObserver:any
  routeObserver:any

  constructor(
    private answerService:AnswerService,
    private userService:UserService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.userObserver = this.userService.getUserByUserId(routeParams.userId)
      .subscribe((res) => {
        this.user = res.data
        console.log(this.user);
        this.user.birthday = dateTimeToDate(this.user.birthday)

        this.answerObserver = this.answerService.getAnswersByUser(this.user.userId)
        .subscribe((res) => {
          this.answers = res.data
          console.log(res);
        })

      },
      (err) => console.log(err))
    })
  }

}
