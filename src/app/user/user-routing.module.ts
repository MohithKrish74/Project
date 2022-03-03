import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { PaymentComponent } from './payment/payment.component';
import { UserComponent } from './user.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';

const routes: Routes = [
  { path: '', component: UserComponent,children:[
    {path:"viewmovie",component:ViewmovieComponent},
    {path:"movieinfo",component:MovieinfoComponent},
    {path:"payment",component:PaymentComponent},
    {path:'',redirectTo:'viewmovie',pathMatch:'full'}
  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
