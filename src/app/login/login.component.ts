import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType:string[]=["User","Admin"];
  userTypeForm:FormGroup;
  
  constructor(public routerObj:Router,public formBuilderObj:FormBuilder,public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.userTypeForm=this.formBuilderObj.group({
      typeOfUser:[''],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  //getters

  get username(){
    return this.userTypeForm.get("username")
  }

  get password(){
    return this.userTypeForm.get("password")
  }

  goToSignUp(){
    this.routerObj.navigateByUrl("/signup")
  }

  userChoice(event){
    console.log(event.target.value)
    if(event.target.value=="User"){
      console.log("Hi user")
    }
    else if(event.target.value=="Admin"){
      console.log("Hi admin")
    }
  }

  onSubmit(){
    console.log(this.userTypeForm.value)
    let loginCredentials = this.userTypeForm.value
    if(loginCredentials.typeOfUser=="User"){
      //remove user type
      delete loginCredentials.typeOfUser
      //subscribe to Observable
      this.userServiceObj.loginUser(loginCredentials).subscribe({
        next:(response)=>{
          if(response.message=="Invalid Username"){
            alert("Invalid Username")
          }
          else if(response.message=="Invalid Password"){
            alert("Invalid Password")
          }
          else if(response.message=="Login Successful"){
            console.log("login sucesss..")
            //create a token
            localStorage.setItem("token",response.token)
            //set the userObj
            this.userServiceObj.dataOfLoggedUserBehaviourSubject.next(response.user)
            //navigate to user dashboard
            this.routerObj.navigateByUrl("/user")
          }
        },
        error:(error)=>{
          console.log("Error",error.message)
        }
      })
    }
    else if(loginCredentials.typeOfUser=="Admin"){
       //remove user type
       delete loginCredentials.typeOfUser
       console.log(loginCredentials)
       //subscribe to Observable
       this.userServiceObj.loginAdmin(loginCredentials).subscribe({
        next:(response)=>{
          if(response.message=="Invalid Username"){
            alert("Invalid Username")
          }
          if(response.message=="Invalid Password"){
            alert("Invalid Password")
          }
          if(response.message=="Login Successful"){
            console.log("login sucesss..")
            //create a token
            localStorage.setItem("token",response.token)
            //set the admin Obj
            this.userServiceObj.dataOfLoggedUserBehaviourSubject.next(response.admin)
            //navigate to admin dashboard
            this.routerObj.navigateByUrl("/admin")
          }
        },
        error:(error)=>{
          console.log("Error",error.message)
        }
      })
    }
    
  }

}
