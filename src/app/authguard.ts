import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
//import {AuthService,GoogleLoginProvider} from 'angular-6-social-login';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authenticationService: AuthserviceService, private router: Router) {}
  
  //socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

  canActivate():any {
    const currentUser = this.authenticationService.currentUserValue();
    if (currentUser)
    {
       return true;
    }
      // not logged in so redirect to login page with the return url
    window.confirm('Please Login First!');
    this.router.navigate(['/']);
    return false;
  }      
}