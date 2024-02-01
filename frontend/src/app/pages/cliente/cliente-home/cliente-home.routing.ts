import { Routes, RouterModule } from '@angular/router';
import { ClienteHomeComponent } from './cliente-home.component';
const routes: Routes = [
  {
    path: ':id',
    component: ClienteHomeComponent,
    redirectTo: 'home',
  }
];

export const ClienteHomeRoutes = RouterModule.forChild(routes);
