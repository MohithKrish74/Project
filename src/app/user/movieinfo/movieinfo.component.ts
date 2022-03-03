import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {

  movieDetails

  constructor(public userServiceObj:UserService,public routerObj:Router) { }

  ngOnInit(): void {
    this.movieDetails=this.userServiceObj.movieInfoBehaviourSubject.getValue()
  }

  goToPayment(){
    this.routerObj.navigateByUrl("/user/payment")
  }

}
