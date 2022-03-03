import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-viewmovie',
  templateUrl: './viewmovie.component.html',
  styleUrls: ['./viewmovie.component.css']
})
export class ViewmovieComponent implements OnInit {

  movieList
  loggedUser

  constructor(public userServiceObj:UserService,public routerObj:Router) { }

  ngOnInit(): void {
    this.loggedUser=this.userServiceObj.userLoginBehaviourSubject.getValue()
    this.userServiceObj.getMovies().subscribe({
      next:(response)=>{
        if(response.message=="Movie List"){
          this.movieList=response.payload
          console.log(response.payload)
          this.movieList.splice(0,1)
        }
        
      },
      error:(error)=>{
        console.log("Error",error.message)
      }
    })
  }

  goToMovieDetails(movieName:string){
    console.log("user selected movie",movieName)
    this.userServiceObj.getMovieByMovieName(movieName).subscribe({
      next:(response)=>{
        if(response.message=="Movie Found"){
          //update movie of user selected
          this.userServiceObj.movieInfoBehaviourSubject.next(response.payload)
          //navigate to movie details page
          this.routerObj.navigateByUrl("/user/movieinfo")

        }
      }
    })
  }

  goToDeletePage(movieName){
    //set delete movie in behaviour subject
    this.userServiceObj.deleteMovieBehaviourSubject.next(movieName)
    //navigate to delete page
    this.routerObj.navigateByUrl("/admin/deletemovie")
  }

}
