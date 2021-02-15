import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
// RECOMMENDED
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { pathToFileURL } from 'url';


import { config } from 'process';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(
      [
        {path:'',component:HomeComponent},
        {path:'members',component:MembersListComponent},
        {path:'members/:id',component:MemberDetailComponent},
        {path:'lists',component:ListsComponent},
        {path:'messages',component:MessagesComponent},
        {path:'**',component:HomeComponent,pathMatch:'full'}

      ]
    ),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1001,      
      preventDuplicates: true,
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
