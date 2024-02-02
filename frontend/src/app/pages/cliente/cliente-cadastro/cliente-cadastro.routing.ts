import { Routes, RouterModule } from '@angular/router';
import { ClienteCadastroComponent } from './cliente-cadastro.component';
const routes: Routes = [
  {
    path: '',
    component: ClienteCadastroComponent,
    },
];

export const ClienteCadastroRoutes = RouterModule.forChild(routes);
