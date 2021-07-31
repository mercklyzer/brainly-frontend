import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuardService implements CanActivate{

  constructor(
    private cookieService:CookieService,
    private router:Router,
  ) { }

  canActivate():boolean {
    if(this.cookieService.get('User')){
      return true
    }
    else{
      this.router.navigate(['/login'])
      return false
    }
  }

}
