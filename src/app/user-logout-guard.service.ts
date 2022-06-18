import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutGuardService implements CanActivate{

  constructor(
    private cookieService:CookieService,
    private router:Router,
  ) { }

  canActivate():boolean {
    if(!this.cookieService.get('User')){
      return true
    }
    else{
      console.log("called reroute");
      this.router.navigate(['/dashboard'])
      return false
    }
  }

}
