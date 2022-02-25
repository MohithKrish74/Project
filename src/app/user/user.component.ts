import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData;

  constructor(public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.userServiceObj.dataOfLoggedUserObservable.subscribe({
      next:(userObj)=>{
        this.userData=userObj
      },
      error:(error)=>{
        console.log("Error",error.message)
      }
    })
  }

}
