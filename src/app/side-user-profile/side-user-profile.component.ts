import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import { ThreadsService } from '../threads.service';
import { UserService } from '../user.service';
import { dateTimeToDate } from '../utils/utils';

@Component({
  selector: 'app-side-user-profile',
  templateUrl: './side-user-profile.component.html',
  styleUrls: ['./side-user-profile.component.css']
})
export class SideUserProfileComponent implements OnInit, OnDestroy {
  @Input() user!:User

  cookieUser!:User
  threadObserver: any

  constructor(
    private cookieService:CookieService,
    private threadsService:ThreadsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cookieUser = JSON.parse(this.cookieService.get('User'))
  }

  ngOnDestroy():void {
    this.threadObserver?.unsubscribe()
  }

  addThread():void {
    this.threadObserver = this.threadsService.addThread(this.user)
    .subscribe((res) => {
      this.router.navigate(['/messages',res.data.threadId])
    },
    (err) => {
      console.log(err);
    })
  }

}
