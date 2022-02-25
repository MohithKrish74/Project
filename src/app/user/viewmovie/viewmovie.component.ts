import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-viewmovie',
  templateUrl: './viewmovie.component.html',
  styleUrls: ['./viewmovie.component.css']
})
export class ViewmovieComponent implements OnInit {

  movieList

  constructor(public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.userServiceObj.getMovies().subscribe({
      next:(response)=>{
        if(response.message=="Movie List"){
          this.movieList=response.payload
          console.log(response.payload)
        }
        
      },
      error:(error)=>{
        console.log("Error",error.message)
      }
    })
  }

}
