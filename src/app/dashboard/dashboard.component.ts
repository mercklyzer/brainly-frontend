import { Component, HostListener, OnInit } from '@angular/core';
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
  offset:number = 0
  requestOnProcess = false
  fetchDisable = false
  helper = {
    titleCase : titleCase,
    relativeDate : relativeDate
  }
  
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    // if end of the page, get new set of questions
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){

      if(!this.requestOnProcess && !this.fetchDisable && this.questions.length !== 0){
        this.requestOnProcess = true
        this.questionService.getQuestions(this.subject, this.offset)
        .subscribe((questions) => {
          this.questions = this.questions.concat(questions.data)
          this.requestOnProcess = false
          this.offset += 5

          if(questions.data.length !== 5) {
            this.fetchDisable = true
          }
        }
        ,
        (err) => {
          console.log(err);
        })  
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.subject = routeParams.subject

      this.questions = []
      this.offset = 0
      this.fetchDisable = false
      this.requestOnProcess = true

      this.questionObserver = this.questionService.getQuestions(this.subject, this.offset).subscribe((questions) => {
        this.requestOnProcess = false
        this.questions = questions.data
        this.offset += 5
        console.log(this.questions);
      })
    })
  }
}
