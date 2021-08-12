import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Question } from '../models/question.model';
import { QuestionService } from '../question.service';
import {relativeDate, titleCase} from '../utils/utils'
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';

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

  watchers:{questionId: string, watchers:User[]}[] = []
  
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    // if end of the page, get new set of questions
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){

      if(!this.requestOnProcess && !this.fetchDisable && this.questions.length !== 0){
        this.requestOnProcess = true
        this.questionService.getQuestions(this.subject, this.offset)
        .subscribe((questions) => {

          questions.data.forEach((question) => {
            console.log("question.id: ", question.questionId);
            this.questionService.socketJoinRoom(question.questionId)
          })


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
        
        questions.data.forEach((question) => {
          console.log("question.id: ", question.questionId);
          this.questionService.socketJoinRoom(question.questionId)
        })
        
        this.questions = questions.data
        this.requestOnProcess = false
        this.offset += 5
      })

      console.log("attempt to subscribe to watchers");
      this.questionService.newWatchers.subscribe((newWatcher) => {
        console.log("new watcher:");
        console.log(newWatcher);
        
        this.watchers = this.insertWatcher(this.watchers, newWatcher)
        console.log("watchers");
        console.log(this.watchers);
      })

    })
  }

  insertWatcher(watchers:{questionId: string, watchers:User[]}[], watcher: {questionId: string, watchers:User[]}){
    let index = watchers.map((el) => el.questionId).indexOf(watcher.questionId)

    // if thread exists
    if(index !== -1){
      watchers[index] = watcher 
      return watchers
    }
    else{
      return [watcher].concat(watchers)
    }
  }

  getWatcher(questionId:string){
    let index = this.watchers?.map((el) => el.questionId).indexOf(questionId)

    if(index !== -1){
      return this.watchers[index]
    }
    else{
      return {watchers: []}
    }
  }
}
