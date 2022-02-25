import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usersignupForm:FormGroup
  
  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService,public routerObj:Router) { }

  ngOnInit(): void {
    this.usersignupForm=this.formBuilderObj.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      email:['',[Validators.required]],
      city:['',[Validators.required]],
      age:['',[Validators.required]]
    })
  }

  //getters

  get username(){
    return this.usersignupForm.get("username")
  }

  get password(){
    return this.usersignupForm.get("password")
  }

  get email(){
    return this.usersignupForm.get("email")
  }

  get city(){
    return this.usersignupForm.get("city")
  }

  get age(){
    return this.usersignupForm.get("age")
  }

  onSubmit(){
    //alert("User created")
    console.log(this.usersignupForm.value)
    //subscribe observable
    this.userServiceObj.createUser(this.usersignupForm.value).subscribe({
      next:(response)=>{
        if(response.message=="User Created"){
          //send info
          alert("User Created Succcessfully!!!")
          //navigate to login page
          this.routerObj.navigateByUrl("/login")
        }
        else{
          if(response.message=="Username already taken.Please choose some other..."){
            alert("Username already taken.Please take some other username.")
          }
        }
      },
      error:(error)=>{}
    })
    
  }

}
