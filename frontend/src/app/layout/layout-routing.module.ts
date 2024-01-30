import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './layout-logado/user-profile.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LayoutLogoutComponent } from './layout-logout/layout-logout.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('../pages/cliente/cliente.module').then(m => m.ClienteModule)
      },
    ]
  },
  {
    path: '',
    component: LayoutLogoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule)
      },
    ]
  }



  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
