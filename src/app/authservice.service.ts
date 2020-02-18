import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AuthService,GoogleLoginProvider} from 'angular-6-social-login';
@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    constructor(private socialAuthService: AuthService ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public loginByName(data:any){
      alert(JSON.stringify(data));
      localStorage.setItem('currentUser', JSON.stringify(data));
      //alert(JSON.stringify(data));
      this.currentUserSubject.next(data);
    }

    public loginByName(name:any){
      let data={name:name,provider:"login"};
      localStorage.setItem('currentUser', JSON.stringify(data));
      //alert(JSON.stringify(data));
      this.currentUserSubject.next(data);
    }
    public logout() {
    // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}