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


  constructor(
    private commentService:CommentService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.commentObserver?.unsubscribe()
  }

  // used onChanges since showComment input changes upon comment icon click
  ngOnChanges():void{
    if(this.showComment){
      if(this.question && !this.answer){
        
        this.commentObserver = this.commentService.getCommentsOfQuestion(this.question.questionId)
        .subscribe((commentResponse) => {
          this.comments = commentResponse.data
          console.log(this.comments);
        })
      }
      else if(this.question && this.answer){
        console.log(this.answer);
        this.commentObserver = this.commentService.getCommentsOfAnswer(this.question.questionId, this.answer.answerId)
        .subscribe((commentResponse) => {
          this.comments = commentResponse.data
        })
      }
    }
  }

  onSubmit(comment:{data:Comment}){
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
