import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './layout-logado/user-profile.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LayoutLogoutComponent } from './layout-logout/layout-logout.component';


const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '', component: LayoutLogoutComponent, children: [
    { path: '', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) }
  ] },
  { path: '**', redirectTo: 'logado', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
