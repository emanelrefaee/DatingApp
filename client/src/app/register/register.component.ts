import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Input () usersFromHomeComponent:any;
  @Output () cancelRegister=new EventEmitter();
  model:any={};
  constructor(private accountSrvice:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  register()
  {
     this.accountSrvice.register(this.model).subscribe(
       Response=>{
           console.log(Response);
       },error=>{
         console.log(error);
         this.toastr.error(error.error);
       }
     );
  }
  cancel()
  {
    this.cancelRegister.emit("false");
  }

}
