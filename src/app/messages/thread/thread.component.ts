import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { MessageService } from '../../services/message.service';
import { Message } from 'src/app/models/message.model';
import { Thread } from 'src/app/models/thread.model';
import { User } from 'src/app/models/user.model';
import { ThreadsService } from '../../services/threads.service';
import { calendarDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('scrollMe') myScrollContainer!:ElementRef;

  @Input() messages!:Message[]
  @Input() messageTyping:boolean = false
  @Output() submit = new EventEmitter<{data : Message}>()

  user!:User
  thread!:Thread
  
  threadObserver:any
  routeObserver:any
  socketThreadObserver:any
  messageTypingObserver:any

  messageForm!:FormGroup 

  prevVal:boolean = false

  constructor(
    private fb:FormBuilder,
    private cookieService:CookieService,
    private threadsService: ThreadsService,
    private messageService: MessageService,
    private route:ActivatedRoute
  ) { }

  helper = {
    calendarDate: calendarDate
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))

    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.threadObserver = this.threadsService.getThread(routeParams.threadId)
      .subscribe((res) => {
        this.thread = res.data

        this.messageForm = this.fb.group({
          message: ['', Validators.required],
          threadId:[this.thread.threadId],
          senderId: [this.user.userId],
          senderUsername: [this.user.username],
          senderProfilePicture: [this.user.profilePicture],
          receiverId: [this.thread.user1Id === this.user.userId? this.thread.user2Id : this.thread.user1Id],
          receiverUsername: [this.thread.user1Username === this.user.username? this.thread.user2Username : this.thread.user1Username],
          receiverProfilePicture: [this.thread.user1ProfilePicture === this.user.profilePicture? this.thread.user2ProfilePicture : this.thread.user1ProfilePicture]
        })
      },
      (err) => {
        console.log(err);
      })
    })
  }

  ngOnChanges(changes: any):void{
    this.messages = changes.messages? changes.messages.currentValue : this.messages
    this.messageTyping = changes.messageTyping.currentValue
  }

  ngOnDestroy():void{
    this.threadObserver?.unsubscribe()
    this.routeObserver?.unsubscribe()
    this.socketThreadObserver?.unsubscribe()
    this.messageTypingObserver?.unsubscribe()
    this.updateSocketMessageTyping(false)
  }


  updateSocketMessageTyping(boolVal:boolean){
    if(this.prevVal !== boolVal){
      this.prevVal = !this.prevVal
      this.messageService.socketMessageTyping(this.messageForm.value, boolVal)
    }
  }

  onSubmit():void{
    this.submit.emit({data: this.messageForm.value})
    
    this.messageForm.get('message')?.reset()
  }

  scrollToBottom():void{
    try{
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch(e){
      console.log(e);
    }
  }

}
