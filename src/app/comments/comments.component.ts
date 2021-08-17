import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentService } from '../comment.service';
import { Answer } from '../models/answer.model';
import { Comment } from '../models/comment.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() showComment:boolean = false
  @Input() question!:Question
  @Input() answer?:Answer

  commentObserver:any
  comments:Comment[] = []

  offset:number = 0
  disableLoad:boolean = false
  requestOnProcess:boolean = false  

  constructor(
    private commentService:CommentService,
  ) { }

  contentLoad:boolean = false

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.commentObserver?.unsubscribe()
  }

  // used onChanges since showComment input changes upon comment icon click
  // better be done using *ngIf
  ngOnChanges():void{
    if(this.showComment && !this.requestOnProcess && !this.disableLoad){

      this.requestOnProcess = true

      if(this.question && !this.answer){
        
        this.commentObserver = this.commentService.getCommentsOfQuestion(this.question.questionId, this.offset)
        .subscribe((commentResponse) => {
          this.comments = commentResponse.data

          if(this.comments.length !== 5){
            this.disableLoad = true
          }

          this.requestOnProcess = false
          this.offset += 5
          this.contentLoad = true
        })
      }
      else if(this.question && this.answer){
        this.commentObserver = this.commentService.getCommentsOfAnswer(this.question.questionId, this.answer.answerId, this.offset)
        .subscribe((commentResponse) => {
          this.comments = commentResponse.data

          if(this.comments.length !== 5){
            this.disableLoad = true
          }

          this.requestOnProcess = false
          this.offset += 5
          this.contentLoad = true

        })
      }
      
    }
  }

  loadMore(){
    if(!this.disableLoad && !this.requestOnProcess && this.comments.length !== 0){

      if(this.question && !this.answer){

        this.commentObserver = this.commentService.getCommentsOfQuestion(this.question.questionId, this.offset)
        .subscribe((commentsResponse) => {
          this.comments = this.comments.concat(commentsResponse.data)
          this.requestOnProcess = false
          this.offset += 5

          if(commentsResponse.data.length !== 5){
            this.disableLoad = true
          }

        })
      }

      else if(this.question && this.answer){
        this.commentObserver = this.commentService.getCommentsOfAnswer(this.question.questionId, this.answer.answerId,this.offset)
        .subscribe((commentsResponse) => {
          this.comments = this.comments.concat(commentsResponse.data)
          this.requestOnProcess = false
          this.offset += 5

          if(commentsResponse.data.length !== 0){
            this.disableLoad = true
          }

        })
      }
    }
    this.requestOnProcess = true
  }


  onSubmit(comment:{data:Comment}){
    if(this.answer){
      this.commentObserver = this.commentService.addCommentOfAnswer(this.question.questionId, this.answer.answerId, comment)
      .subscribe((res) => {
        console.log(res);
        this.comments.push(res.data)
      },
      (err) => {
        console.log(err);
      })
    }
    else{
      this.commentObserver = this.commentService.addCommentOfQuestion(this.question.questionId, comment)
      .subscribe((res) => {
        console.log(res);
        this.comments.push(res.data)
      },
      (err) => {
        console.log(err);
      })
    }

  }

}
