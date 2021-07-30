import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { Answer } from '../models/answer.model';
import { Comment } from '../models/comment.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() showComment:boolean = false
  @Input() question!:Question 
  @Input() answer?:Answer

  commentForm:FormGroup = this.fb.group({
    comment: ['', Validators.required]
  })

  commentObserver:any
  comments:Comment[] = []

  constructor(
    private commentService:CommentService,
    private fb:FormBuilder,
    private router:Router
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

  onSubmit():void{
    console.log(this.commentForm.value);

    this.commentObserver = this.commentService.addCommentOfQuestion(this.question.questionId, {data: this.commentForm.value})
    .subscribe((res) => {
      console.log(res);
      this.redirectTo(`/question/${this.question.questionId}`)
    },
    (err) => {
      console.log(err);
    })
  }

  redirectTo(uri:string){
    this.router.navigate(['/dummy'], {skipLocationChange: true}).then( () =>{
      console.log("after first reroute")
      this.router.navigate([uri])
    });
 }

}
