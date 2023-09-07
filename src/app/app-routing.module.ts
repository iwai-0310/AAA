import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './component/users/users.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { userResolver } from './service/user.resolver';

const routes: Routes = [
  {path:'users',component:UsersComponent},
  {path:'user/:uuid',component:UserdetailComponent,resolve:{resolvedResponse:userResolver}},
  {path:'**',redirectTo:'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

