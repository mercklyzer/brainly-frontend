import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() showComment:boolean = false
  @Input() questionId:string = ''
  @Input() answerId:string = ''

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

  ngOnChanges():void{
    if(this.showComment){
      if(this.questionId && !this.answerId){
        
        this.commentObserver = this.commentService.getCommentsOfQuestion(this.questionId)
        .subscribe((commentResponse) => {
          this.comments = commentResponse.data
          console.log(this.comments);
        })
      }
      else if(this.questionId && this.answerId){
        console.log(this.answerId);
        this.commentObserver = this.commentService.getCommentsOfAnswer(this.questionId, this.answerId)
        .subscribe((commentResponse) => {
          this.comments = commentResponse.data
        })
      }

    }
  }

}
