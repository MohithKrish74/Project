import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-addseat',
  templateUrl: './addseat.component.html',
  styleUrls: ['./addseat.component.css']
})
export class AddseatComponent implements OnInit {

  addSeatForm:FormGroup
  
  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService,public routerObj:Router) { }

  ngOnInit(): void {
    this.addSeatForm = this.formBuilderObj.group({
      seatType:[''],
      seatNumber:['']
    })
  }

  //getter
  get seatNumber(){
    return this.addSeatForm.get("seatNumber")
  }

  onSubmit(){
    console.log(this.addSeatForm.value)
    delete this.addSeatForm.value.seatType
    let newSeat =this.addSeatForm.value.seatNumber
    this.userServiceObj.createSeat(this.addSeatForm.value).subscribe({
      next:(response)=>{
        alert("Seat Added")
        //navigate to view
        this.routerObj.navigateByUrl("/admin/viewmovie")
      },
      error:(error)=>{
        alert("Something went wrong...")
      }
    })
  }

}
