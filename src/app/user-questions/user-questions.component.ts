import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';
import { dateTimeToDate } from '../utils/utils';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit, OnDestroy {
  questions:Question[] = []
  user!:User
  private subscriptions = new Subscription()

  offset:number = 0
  requestOnProcess = false
  fetchDisable = false

  constructor(
    private userService:UserService,
    private questionService:QuestionService,
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

        this.subscriptions.add(this.questionService.getQuestionsByUser(this.user.userId, this.offset)
        .subscribe((res) => {
          this.questions = res.data
          this.requestOnProcess = false
          this.offset += 5
          console.log(res);
        },
        (err) => {
          console.log(err);
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

      if(!this.requestOnProcess && !this.fetchDisable && this.questions.length !== 0){
        this.questionService.getQuestionsByUser(this.user.userId, this.offset)
        .subscribe((questions) => {
          this.questions = this.questions.concat(questions.data)
          this.requestOnProcess = false
          this.offset += 5

          if(questions.data.length === 0) {
            this.fetchDisable = true
            this.requestOnProcess = false
          }
        }
        ,
        (err) => {
          console.log(err);
        })  
      }

      this.requestOnProcess = true
    }
  }

}
