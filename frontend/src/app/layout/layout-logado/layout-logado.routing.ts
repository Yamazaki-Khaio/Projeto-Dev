import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)}
    ]

  },
];

export const LayoutLogadoRoutes = RouterModule.forChild(routes);
