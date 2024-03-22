import { ListIdComponent } from './conponent/list-id/list-id.component';
import { ListComponent } from './conponent/list/list.component';
import { Component } from '@angular/core';
import { Routes, CanActivateFn } from '@angular/router';
import { SignupComponent } from './conponent/signup/signup.component';
import { LoginComponent } from './conponent/login/login.component';
import { ComingsoonComponent } from './conponent/comingsoon/comingsoon.component';
import { ListusersComponent } from './conponent/listusers/listusers.component';
import { UsersComponent } from './conponent/users/users.component';
import { authGuard } from './auth.guard';
import { gaurdAuth2Guard } from './gaurd-auth2.guard';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent,canActivate:[gaurdAuth2Guard] },
  { path: 'login', component: LoginComponent,canActivate:[gaurdAuth2Guard] },
  { path: '', component: LoginComponent,canActivate:[gaurdAuth2Guard] },


  { path: 'list', component: ListComponent,canActivate:[authGuard] },
  { path: 'list/:id', component: ListIdComponent },
  { path: 'listusers', component: ListusersComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: ComingsoonComponent,canActivate:[authGuard] },
];
