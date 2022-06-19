import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { User } from "src/app/models/user.model";

@Component({
    selector: 'dashboard-side-user',
    templateUrl: './dashboard-side-user.component.html',
    styleUrls: ['./dashboard-side-user.component.css'],
})
export class DashboardSideUserComponent implements OnInit{

    user!:User

    constructor(
      private cookieService:CookieService
    ) { }
  
    ngOnInit(): void {
      this.user = JSON.parse(this.cookieService.get('User'));
    }

}