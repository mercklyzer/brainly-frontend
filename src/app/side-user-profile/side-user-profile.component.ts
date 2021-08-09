import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { dateTimeToDate } from '../utils/utils';

@Component({
  selector: 'app-side-user-profile',
  templateUrl: './side-user-profile.component.html',
  styleUrls: ['./side-user-profile.component.css']
})
export class SideUserProfileComponent implements OnInit {
  @Input() user!:User

  // userObserver:any
  // routeObserver:any
  cookieUser!:User

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    console.log("side-user-profile");
    console.log(this.user);
    this.cookieUser = JSON.parse(this.cookieService.get('User'))
    // this.routeObserver = this.route.params.subscribe((routeParams) => {
    //   this.userObserver = this.userService.getUserByUserId(routeParams.userId)
    //   .subscribe((res) => {
    //     this.user = res.data
    //     this.user.birthday = dateTimeToDate(this.user.birthday)
    //   },
    //   (err) => console.log(err))
    // })
  }

}
