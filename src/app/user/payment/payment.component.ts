import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  seatsInfo
  costOfSeat:number=0;
  seatSelectedByUser:string[]=[]
  isSeatSelected:boolean=false
  fillTicketForm:FormGroup
  payAmount:number=0
  maximumTickets:number=0
  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.fillTicketForm=this.formBuilderObj.group({
      name:[''],
      numberOfTickets:[''],
      showType:[''],
      showTiming:[''],
    })
    this.getSeats()
  }

  updateTicketCount(count){
    this.maximumTickets=Number(count)
    console.log(this.maximumTickets)
  }

  seatSelection(event){
    if(event.target.value=="Normal"){
      this.costOfSeat=150
    }
    else if(event.target.value=="Executive"){
      this.costOfSeat=220
    }
    else if(event.target.value=="Premium"){
      this.costOfSeat=350
    }
    else if(event.target.value=="VIP"){
      this.costOfSeat=500
    }
  }

  seatSelected(seatNumber){
    console.log(this.seatSelectedByUser)
    if((this.seatSelectedByUser.length)<(this.maximumTickets)){
      console.log(this.fillTicketForm.value.numberOfTickets)
      this.seatSelectedByUser.push(seatNumber)
      this.payAmount=this.costOfSeat*(this.seatSelectedByUser.length+1)
      console.log(this.seatSelectedByUser)
      this.userServiceObj.getSeatUsingSeatNumber(seatNumber).subscribe({
        next:(response)=>{
          console.log("seat selected",response.payload)
          response.payload.isSeatSelected=!response.payload.isSeatSelected
          this.userServiceObj.updateSeat(response.payload).subscribe({
            next:(data)=>{
              console.log("Data updated")
              console.log("length",this.seatSelectedByUser.length)
              this.getSeats()
            },
            error:(error)=>{
              alert("Something went wrong...")
            }
          })
        },
        error:(error)=>{
          alert("Something went wrong...")
        }
      })
    }
    else{
      alert(`Ticket limit exceeded.Maximum tickets can be selected by you is ${this.fillTicketForm.value.numberOfTickets}`)
    } 
  }

  getSeats(){
    this.userServiceObj.getAllSeatsInTheatre().subscribe({
      next:(response)=>{
        console.log(response)
        this.seatsInfo=response.payload
      },
      error:(error)=>{
        alert("Something went wrong...")
      }
    })
  }

  onSubmit(){
    this.seatSelectedByUser=[]
    console.log(this.fillTicketForm.value)
  }

}
