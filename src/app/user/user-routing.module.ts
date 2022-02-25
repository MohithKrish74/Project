import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ViewmovieComponent } from './viewmovie/viewmovie.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {path:"viewmovie",component:ViewmovieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
