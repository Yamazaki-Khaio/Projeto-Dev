import { Routes, RouterModule } from '@angular/router';
import { LayoutLoginComponent } from './layout-login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '', loadChildren: () => import('../../pages/users/user-login/user-login.module').then(m => m.UserLoginModule)
      },
      {
        path: 'register', loadChildren: () => import('../../pages/users/user-registration/user-registration.module').then(m => m.UserRegistrationModule),
      }
    ]
  },

];

export const LayoutLogoutRoutes = RouterModule.forChild(routes);
