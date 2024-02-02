import { Routes, RouterModule } from '@angular/router';
import { ClienteHomeComponent } from './cliente-home.component';
const routes: Routes = [
  {
    path: '',
    component: ClienteHomeComponent,
  }
];

export const ClienteHomeRoutes = RouterModule.forChild(routes);
