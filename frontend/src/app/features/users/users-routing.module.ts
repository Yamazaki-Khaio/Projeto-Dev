import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent, children: [
    {
      path: 'cliente',
      loadChildren: () => import('../cliente/cliente.module').then(m => m.ClienteModule),
    },
  ]},
];

    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class UsersRoutingModule { }
