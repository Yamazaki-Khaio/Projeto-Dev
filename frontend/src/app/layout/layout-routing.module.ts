import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './layout-logado/user-profile.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout-logado/layout-logado.module').then(m => m.LayoutLogodoModule),
  },
  {
    path: '',
    loadChildren: () => import('./layout-logout/layout-logout.module').then(m => m.LayoutLogoutModule),
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    children: [
      { path: '', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
