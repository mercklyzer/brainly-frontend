import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { dateTimeToDate } from '../utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit, OnDestroy {
  answers:Answer[] = []
  user!:User
  private subscriptions = new Subscription()

  offset:number = 0
  requestOnProcess = false
  fetchDisable = false

  constructor(
    private answerService:AnswerService,
    private userService:UserService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe((routeParams) => {
      this.subscriptions.add(this.userService.getUserByUserId(routeParams.userId)
      .subscribe((res) => {
        this.user = res.data
        this.user.birthday = dateTimeToDate(this.user.birthday)

        this.offset = 0
        this.fetchDisable = false
        this.requestOnProcess = false

        this.subscriptions.add(this.answerService.getAnswersByUser(this.user.userId, this.offset)
        .subscribe((res) => {
          this.answers = res.data
          this.requestOnProcess = false
          this.offset += 5
        }))

      },
      (err) => console.log(err)))
    }))
  }

  ngOnDestroy():void{
    this.subscriptions.unsubscribe()
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    // if end of the page, get new set of questions
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){

      if(!this.requestOnProcess && !this.fetchDisable && this.answers.length !== 0){
        this.subscriptions.add(this.answerService.getAnswersByUser(this.user.userId, this.offset)
        .subscribe((answers) => {
          this.answers = this.answers.concat(answers.data)
          this.requestOnProcess = false
          this.offset += 5

          if(answers.data.length === 0) {
            this.fetchDisable = true
            this.requestOnProcess = false
          }
        }
        ,
        (err) => {
          console.log(err);
        }))
      }

      this.requestOnProcess = true
    }
  }


}
