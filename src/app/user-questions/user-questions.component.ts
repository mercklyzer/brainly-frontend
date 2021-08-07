import { Component, HostListener, OnInit } from '@angular/core';
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

  offset:number = 0
  requestOnProcess = false
  fetchDisable = false

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

        this.offset = 0
        this.fetchDisable = false
        this.requestOnProcess = false

        this.questionObserver = this.questionService.getQuestionsByUser(this.user.userId, this.offset)
        .subscribe((res) => {
          this.questions = res.data
          this.requestOnProcess = false
          this.offset += 5
          console.log(res);
        },
        (err) => {
          console.log(err);
        })

      },
      (err) => console.log(err))
    })
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
