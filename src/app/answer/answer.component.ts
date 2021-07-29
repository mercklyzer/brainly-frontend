import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Answer } from '../models/answer.model';
import * as utils from '../utils/utils';
import * as moment from 'moment'
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer!:Answer
  @Input() questionId:string = ''
  
  showComment:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onCommentClick():void{
    this.showComment = true
  }

  relativeDate = (time:number):string => moment(time).fromNow()
}
