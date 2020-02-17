import { Component, OnInit } from '@angular/core';
import {AuthService,GoogleLoginProvider} from 'angular-6-social-login';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  name:string;
  socialPlatformProvider:string;
  constructor(private socialAuthService: AuthService, private authenticationService: AuthserviceService ) {
   this.user = this.authenticationService.currentUserValue();
   }

  ngOnInit() {
  }
  
  socialSignIn(socialPlatform : string) {
  // if(socialPlatform == "facebook")
  // {
  //   this.socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  // }
  if(socialPlatform == "google")
  {
    this.socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  }
  
  this.socialAuthService.signIn(this.socialPlatformProvider).then(
    
    (userData):any => {
      this.authenticationService.loginByGmail(userData);
      //console.log(socialPlatform+" sign in data : " , userData);
      this.user=userData;     
    }
  );
  }

  signIn() {
    this.authenticationService.loginByName(this.name);
    this.user=this.name;
  }
  signOut() {
    this.user="";
    this.name="";
    this.authenticationService.logout();
  }

  socialSignOut()
  {
    this.socialAuthService.signOut();
    this.user="";
    this.authenticationService.logout();
    //console.log("User Signed Out");
  }
}
