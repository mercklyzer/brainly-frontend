import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  userObserver:any
  routeObserver:any

  constructor(
    private userService:UserService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
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
