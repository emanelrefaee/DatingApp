import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import 'rxjs/operators'
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { User } from '../_models/User';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   
  baseUrl='https://localhost:5001/api/';
  private currentUserSOurce=new ReplaySubject<User>(1);
  currentUser$=this.currentUserSOurce.asObservable();
  constructor(private http:HttpClient) { }

  login(model:any)
  {
    return  this.http.post(this.baseUrl+'accounts/login',model).pipe(
      map((response:User)=>
      {
        const user=response;
        if(user)
        {
          console.log(user);
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSOurce.next(user);
          
        }
      })
    );
  }
  setCurrentUser(user:User)
  {
    this.currentUserSOurce.next(user);
  }
  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSOurce.next(null);
  }
}
