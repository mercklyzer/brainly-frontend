import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Thread } from 'src/app/models/thread.model';
import { User } from 'src/app/models/user.model';
import { relativeDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.css']
})
export class ThreadsListComponent implements OnInit {
  @Input() threads!:Thread[]
  user!:User
  constructor(
    private cookieService:CookieService,
    private router:Router
  ) { }

  helper = {
    relativeDate : relativeDate
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
  }

  changeThread(threadId:string){
    this.router.navigate(['/messages',threadId])
  }

}
