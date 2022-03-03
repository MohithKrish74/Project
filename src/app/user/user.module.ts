import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    UserComponent,
    ViewmovieComponent,
    MovieinfoComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
