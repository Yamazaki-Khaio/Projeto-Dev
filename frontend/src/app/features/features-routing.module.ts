import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
  path: 'users',
  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
},

{
  path: 'products',
  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
},

{
  path: 'orders',
  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
