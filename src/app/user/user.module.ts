import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';


@NgModule({
  declarations: [
    UserComponent,
    ViewmovieComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
