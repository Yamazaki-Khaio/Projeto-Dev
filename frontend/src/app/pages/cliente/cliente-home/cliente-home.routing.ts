import { Routes, RouterModule } from '@angular/router';
import { ClienteHomeComponent } from './cliente-home.component';
const routes: Routes = [
  {
    path: ':id',
    component: ClienteHomeComponent,
    redirectTo: 'clientes',
  }
];

export const ClienteHomeRoutes = RouterModule.forChild(routes);
