import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { AddseatComponent } from './addseat/addseat.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AdminComponent,
    ViewmovieComponent,
    AddmovieComponent,
    DeletemovieComponent,
    AddseatComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
