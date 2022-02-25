import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    ViewmovieComponent,
    AddmovieComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
