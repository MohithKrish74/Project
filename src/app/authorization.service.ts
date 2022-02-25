import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      //get the token
      let token = localStorage.getItem("token")
      //if token available
      if(token!==null){
        let clonedRequest = req.clone({
          headers:req.headers.set("Authorization","Bearer "+token)
        })
        return next.handle(clonedRequest)
      }
      //if token not available
      else{
        return next.handle(req)
      }
  }

}
