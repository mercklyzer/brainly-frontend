import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/question.model';
import { QuestionService } from '../question.service';
import {relativeDate, titleCase} from '../utils/utils'
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  questions:Question[] = []

  routeObserver:any
  questionObserver:any
  subject:string = 'all'

  helper = {
    titleCase : titleCase,
    relativeDate : relativeDate
  }
  
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    if(this.isUserLoggedIn()){
      this.routeObserver = this.route.params.subscribe((routeParams) => {

        this.questionObserver = this.questionService.getQuestions(routeParams.subject).subscribe((questions) => {
          this.questions = questions.data
          console.log(this.questions);
        })
      })
    }
  }

  isUserLoggedIn():boolean{
    return this.cookieService.get('Token') !== undefined
  }
}
