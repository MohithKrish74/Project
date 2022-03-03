import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {

  constructor(public userServiceObj:UserService,public routerObj:Router) { }

  ngOnInit(): void {
    
  }

  confirmdelete(movieName){
    // this.userServiceObj.deleteMovies(movieName).subscribe({
    //   next:(response)=>{
    //     alert("Movie Deleted")
    //   },
    //   error:()=>{
    //     alert("Something went wrong...")
    //   }
    // })
    console.log(movieName)
    //alert
    alert("Movie Deleted")
    //navigate to view page
    this.routerObj.navigateByUrl("/admin/viewmovie")
    
  }

}
