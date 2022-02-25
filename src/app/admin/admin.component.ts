import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminData

  constructor(public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.userServiceObj.dataOfLoggedUserObservable.subscribe({
      next:(adminObj)=>{
        this.adminData=adminObj
      },
      error:(error)=>{
        console.log("Error",error.message)
      }
    })
  }

}
