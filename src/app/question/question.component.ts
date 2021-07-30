import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';
import { Comment } from '../models/comment.model';
import { CommentService } from '../comment.service';
import {relativeDate, titleCase} from '../utils/utils'
import { Answer } from '../models/answer.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  routeObserver:any
  questionObserver:any
  
  showAnswer:boolean = false
  showComment:boolean = false

  question!:Question

  helper = {
    relativeDate: relativeDate,
    titleCase: titleCase
  }

  constructor(
    private questionService:QuestionService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.questionObserver = this.questionService.getQuestion(routeParams.questionId)
      .subscribe((question) => {
        this.question = question.data
      })
    })
  }

  ngOnDestroy():void{
    this.routeObserver?.unsubscribe()
    this.questionObserver?.unsubscribe()
  }

  onAnswerClick():void{
    this.showAnswer = true
  }

  onCommentClick():void{
    this.showComment = true
  }
}
