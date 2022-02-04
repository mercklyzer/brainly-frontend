import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { Thread } from '../models/thread.model';
import { User } from '../models/user.model';
import { ThreadsService } from '../threads.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  threadsObserver:any
  messageLoadObserver:any
  messageSendObserver:any
  routeObserver:any

  socketMessageObserver: any
  socketThreadObserver: any
  messageTypingObserver:any

  user!:User

  threads:Thread[] = []
  messages:Message[] = []

  messageTyping:boolean = false

  threadId!:string

  constructor(
    private threadsService:ThreadsService,
    private route: ActivatedRoute,
    private messageService:MessageService,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
    this.messageService.socketJoinRoom(this.user.userId)
    console.log("joining room");
    console.log(this.user.userId);
    this.socketMessageObserver = this.messageService.newMessage.subscribe(message => {
      console.log("receiverId: " , message.receiverId);
      console.log("userId: " , this.user.userId);
      if(message.threadId === this.threadId){
        this.messages.push(message)
      }
    })

    this.messageTypingObserver = this.messageService.messageTyping.subscribe(typingObj => {
      console.log("messageTyping");
      console.log(this.threadId);
      console.log(typingObj);
      if(this.threadId === typingObj.threadId){
        console.log("message typing inside thread");
        this.messageTyping = typingObj.isTyping
      }
    })

    this.socketThreadObserver = this.threadsService.newThread.subscribe(thread => {
      console.log(thread);
      this.threads = this.insertThread(this.threads, thread)
    })


    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.messageLoadObserver = this.messageService.getMessages(routeParams.threadId)
      .subscribe((res) => {
        this.threadId = routeParams.threadId
        this.messages = res.data.reverse()
      })
    })
    
    this.threadsObserver = this.threadsService.getThreads()
    .subscribe((res) => {
      this.threads = res.data
    },
    (err) => {
      console.log(err);
    })
  }

  ngOnDestroy():void{
    this.threadsObserver?.unsubscribe()
    this.messageLoadObserver?.unsubscribe()
    this.messageSendObserver?.unsubscribe()
    this.routeObserver?.unsubscribe()
    this.socketMessageObserver?.unsubscribe()
    this.socketThreadObserver?.unsubscribe()
    this.messageTypingObserver?.unsubscribe()
  }

  onSubmit(message:{data:Message}){
    this.messageSendObserver = this.messageService.addMessage(message)
    .subscribe((res) => {
      console.log(res.data);
    })
  }

  insertThread(threads:Thread[], thread: Thread){
    let index = threads.map((el) => el.threadId).indexOf(thread.threadId)

    // if thread exists
    if(index !== -1){
      threads.splice(index, 1)
    }

    return [thread].concat(threads)
  }

}
