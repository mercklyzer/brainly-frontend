import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { CommentService } from '../services/comment.service';
import { Answer } from '../models/answer.model';
import { Comment } from '../models/comment.model';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  @Input() question!:Question
  @Input() answer?:Answer
  @Output() submit = new EventEmitter<{data : Comment}>()

  isTypingComment:boolean = false

  user!:User

  commentForm:FormGroup = this.fb.group({
    comment: ['', Validators.required]
  })


  constructor(
    private fb:FormBuilder,
    private cookieService:CookieService,
    private commentService:CommentService
  ) { }

  private subscriptions = new Subscription()

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
    this.subscriptions.add(this.commentService.isTypingComment.subscribe(({questionId, answerId, isTyping}) => {
      if(answerId){
        if(answerId === this.answer?.answerId){
          this.isTypingComment = isTyping
        }
      }
      else{
        this.isTypingComment = isTyping
      }
      console.log("received: ", isTyping);
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  onSubmit():void{
    this.submit.emit({data: this.commentForm.value})
    this.commentForm.reset()
    this.commentService.socketUpdateTypingComment(this.question.questionId, this.answer?.answerId, false)
  }

  updateCommentTyping(key:KeyboardEvent){
    console.log(key);
    if(key.key === "Enter" || key.key === 'Tab' || key.key === 'Alt'){
      return
    }
    if(this.commentForm.get('comment')?.value !== ''){
      console.log("true");
      this.commentService.socketUpdateTypingComment(this.question.questionId, this.answer?.answerId, true)

    }
    else{
      console.log("false");
      this.commentService.socketUpdateTypingComment(this.question.questionId, this.answer?.answerId, false)
    }
  }

}
