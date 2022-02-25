import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmovieComponent } from '../user/viewmovie/viewmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path:'viewmovie',component:ViewmovieComponent},
  { path:'addmovie',component:AddmovieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
