import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';
import { Comment } from '../models/comment.model';
import { CommentService } from '../comment.service';
import * as moment from 'moment'
import { Answer } from '../models/answer.model';
import { AnswerService } from '../answer.service';

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
  showComment:boolean = false

  question!:Question
  answers:Answer[] = []
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
        })

      })
    })
  }

  onAnswerClick():void{
    this.showAnswer = true
  }

  onCommentClick():void{
    this.showComment = true
  }

  relativeDate(time:number){
    return moment(time).fromNow()
  }

  titleCase(param:string):string{
    return param.split('-').map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ')
  }

}
