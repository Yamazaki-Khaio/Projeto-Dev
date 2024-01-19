import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesModule } from './features/features.module';
const routes: Routes = [
  { path: '', redirectTo: 'users/register', pathMatch: 'full' },
  { path: '', loadChildren: () => FeaturesModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
