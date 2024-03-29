
import { ListIdComponent } from './conponent/list-id/list-id.component';
import { ListComponent } from './conponent/users/list.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './conponent/signup/signup.component';
import { LoginComponent } from './conponent/login/login.component';
import { ComingsoonComponent } from './conponent/comingsoon/comingsoon.component';
import { ListusersComponent } from './conponent/listusers/listusers.component';
import { authGuard } from './auth.guard';
import { gaurdAuth2Guard } from './gaurd-auth2.guard';
import { UpdateUserComponent } from './conponent/update-user/update-user.component';
import { SettingComponent } from './conponent/setting/setting.component';
import { EditTemplateComponent } from './conponent/setting/edit-template/edit-template.component';

export const routes: Routes = [
  { path: 'signup','title':"SignUp", component: SignupComponent,canActivate:[gaurdAuth2Guard] },
  { path: 'login', 'title':"SignUp", component: LoginComponent,canActivate:[gaurdAuth2Guard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },


  { path: 'users', 'title':"Users" , component: ListComponent,canActivate:[authGuard] },
  { path: 'user/:id','title':"User Details", component: ListIdComponent,canActivate:[authGuard] },
  { path: 'listusers', component: ListusersComponent,canActivate:[authGuard] },
  { path: 'settings','title':"Setting", component: SettingComponent,canActivate:[authGuard] },
  {path:'settings',children:[
    {path:'template/:name', component: EditTemplateComponent}
  ]},
  { path: 'user/update/:id','title':"Update", component: UpdateUserComponent,canActivate:[authGuard] },


  { path: '**','title':"Coming Soon", component: ComingsoonComponent,canActivate:[authGuard] },
];
