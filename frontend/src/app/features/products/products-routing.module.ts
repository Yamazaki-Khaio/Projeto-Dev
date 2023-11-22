import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsRegistrationComponent } from './products-registration/products-registration.component';

const routes: Routes = [{
  path: 'register', component: ProductsRegistrationComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
