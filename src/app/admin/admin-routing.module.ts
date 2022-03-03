import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmovieComponent } from '../user/viewmovie/viewmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddseatComponent } from './addseat/addseat.component';
import { AdminComponent } from './admin.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';

const routes: Routes = [
  { path: '', component: AdminComponent,children:[
    { path:'viewmovie',component:ViewmovieComponent},
    { path:'addmovie',component:AddmovieComponent},
    {path:'deletemovie',component:DeletemovieComponent},
    {path:'addseat',component:AddseatComponent},
    {path:'',redirectTo:'viewmovie',pathMatch:'full'}
  ] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
