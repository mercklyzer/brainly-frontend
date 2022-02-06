import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import {relativeDate, titleCase} from '../utils/utils'
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  questions:Question[] = []

  private subscriptions = new Subscription()

  subject:string = 'all'
  offset:number = 0
  requestOnProcess = false
  fetchDisable = false
  helper = {
    titleCase : titleCase,
    relativeDate : relativeDate
  }

  watchers:{questionId: string, watchers:User[]}[] = []
  newQuestions:Question[] = []

  contentLoad:boolean = false

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    // if end of the page, get new set of questions
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){

      if(!this.requestOnProcess && !this.fetchDisable && this.questions.length !== 0){
        this.requestOnProcess = true
        this.subscriptions.add(this.questionService.getQuestions(this.subject, this.offset)
        .subscribe((questions) => {

          questions.data.forEach((question) => {
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
        }))
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  hamburgerOn:boolean = true

  ngOnInit(): void {
    this.questionService.socketJoinSubject(this.subject)

    this.subscriptions.add(this.route.params.subscribe((routeParams) => {
      this.toggleHamburger()

      this.subject = routeParams.subject

      // have to declare here for changing the subject in the dashboard
      this.questions = []
      this.offset = 0
      this.fetchDisable = false
      this.requestOnProcess = true
      this.contentLoad = false

      this.subscriptions.add(this.questionService.getQuestions(this.subject, this.offset).subscribe((questions) => {

        questions.data.forEach((question) => {
          this.questionService.socketJoinRoom(question.questionId)
        })
        
        this.questions = questions.data
        this.requestOnProcess = false
        this.offset += 5
        this.contentLoad = true
      }))

      // accepts a new watcher and assigns to which question
      this.subscriptions.add(this.questionService.newWatchers.subscribe((newWatcher) => {
        this.watchers = this.insertWatcher(this.watchers, newWatcher)
      }))

      // for updating newly added questions
      this.subscriptions.add(this.questionService.newQuestion.subscribe((newQuestion) => {
        this.questionService.socketJoinRoom(newQuestion.questionId)
        this.newQuestions = [newQuestion].concat(this.newQuestions)
      }))

    }))
  }

  ngOnDestroy(): void{
    this.questionService.socketLeaveSubject(this.subject)
    this.subscriptions.unsubscribe()
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

  onNewQuestions(){
    window.scroll(0,0)
    this.questions = this.newQuestions.concat(this.questions)
    this.newQuestions = []
  }

  toggleHamburger(){
    this.hamburgerOn = !this.hamburgerOn
    console.log("toggling: ", this.hamburgerOn);
  }
}
