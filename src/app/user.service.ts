import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClientObj:HttpClient) { }

  //create behaviour subject
  userLoginBehaviourSubject = new BehaviorSubject(null)

  //create user observable
  userLoginObservable = this.userLoginBehaviourSubject.asObservable()

  //logged user behaviuor subject
  dataOfLoggedUserBehaviourSubject = new BehaviorSubject(null)

  //logged user observable
  dataOfLoggedUserObservable = this.dataOfLoggedUserBehaviourSubject.asObservable()

  //create user
  createUser(userObj):Observable<any>{
    return this.httpClientObj.post<any>("http://localhost:5000/user/createuser",userObj)
  }

  //login user
  loginUser(userCredentials):Observable<any>{
    this.userLoginBehaviourSubject.next(userCredentials.username)
    return this.httpClientObj.post<any>("http://localhost:5000/user/login",userCredentials)
  }

  //login user
  loginAdmin(adminCredentials):Observable<any>{
    this.userLoginBehaviourSubject.next(adminCredentials.username)
    return this.httpClientObj.post<any>("http://localhost:5000/admin/login",adminCredentials)
  }

  //logout user
  logoutUser(){
    localStorage.removeItem("token")
    this.userLoginBehaviourSubject.next(null)
  }

  //get movies
  getMovies():Observable<any>{
    return this.httpClientObj.get("http://localhost:5000/admin/getmovies")
  }

  //add movies
  addMovies(movieObj):Observable<any>{
    return this.httpClientObj.post<any>("http://localhost:5000/admin/addmovie",movieObj)
  }

}
