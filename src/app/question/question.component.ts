import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';
import { Comment } from '../models/comment.model';
import { CommentService } from '../comment.service';
import * as moment from 'moment'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  routeObserver:any
  questionObserver:any
  commentObserver:any
  showAnswer:boolean = false

  question!:Question
  comments:Comment[] = []

  constructor(
    private questionService:QuestionService,
    private commentService:CommentService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.questionObserver = this.questionService.getQuestion(routeParams.questionId)
      .subscribe((question) => {
        this.question = question.data
        console.log(this.question);

        // get comments for the question
        this.commentObserver = this.commentService.getCommentsOfQuestion(routeParams.questionId)
        .subscribe((comments) => {
          this.comments = comments.data
          console.log(this.comments);
        })

      })
    })
  }

  onAnswerClick():void{
    this.showAnswer = true
  }

  relativeDate(time:number){
    return moment(time).fromNow()
  }

  titleCase(param:string):string{
    return param.split('-').map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ')
  }

}
