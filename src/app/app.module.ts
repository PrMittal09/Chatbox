import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider} from "angular-6-social-login";
import { ChatService } from './chat.service';
import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { LoginComponent } from './login/login.component';
import { CanActivateViaAuthGuard } from './authguard';
import { AuthserviceService } from './authservice.service';

const appRoutes: Routes = [
  { path:'',component: LoginComponent },
  { path: 'chatbox', component: ChatboxComponent,  canActivate: [CanActivateViaAuthGuard] }
  //{ path: 'chatbox', component: ChatboxComponent}
];



const google_auth_client_id:string="225063008309-f404s6of7tr6ehio3jnuhahmv0sd1ceh.apps.googleusercontent.com";
// const Facebook_auth_client_id:string="1107292062777356";
export function getAuthServiceConfigs() {
let config = new AuthServiceConfig(
  [
    // {
    //   id: FacebookLoginProvider.PROVIDER_ID,
    //   provider: new FacebookLoginProvider(Facebook_auth_client_id)
    // },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(google_auth_client_id)
    },
  ]
);
return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ChatService,
    AuthserviceService,
    CanActivateViaAuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
