import { Routes, RouterModule } from '@angular/router';
import { LayoutLogoutComponent } from './layout-logout.component';

const routes: Routes = [
  { path: '',
    component: LayoutLogoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
      }
    ],
},

];

export const LayoutLogoutRoutes = RouterModule.forChild(routes);
