import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../models/question.model';
import { QuestionService } from '../question.service';
import * as moment from 'moment';
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

  // helper functions
  helper = {
    titleCase : titleCase,
    relativeDate : relativeDate
  }
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    if(this.isUserLoggedIn()){
      this.routeObserver = this.route.params.subscribe((routeParams) => {

        // subscribe to question service
        this.questionObserver = this.questionService.getQuestions(routeParams.subject).subscribe((questions) => {
          this.questions = questions.data
          console.log(this.questions);
        })
      })
    }

    else{
      this.router.navigate(['/']);
    }
  }

  isUserLoggedIn():boolean{
    console.log(this.cookieService.get('Token'));
    console.log(this.cookieService.get('Token') !== undefined);
    return this.cookieService.get('Token') !== undefined
  }
}
