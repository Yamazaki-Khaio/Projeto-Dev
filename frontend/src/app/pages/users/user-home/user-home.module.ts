import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserHomeComponent } from './user-home.component';
import { UserHomeRouting } from './user-home.routing';

@NgModule({
  declarations: [
    UserHomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    UserHomeRouting,
  ],
  exports: [],
  providers: []
})
export class UserHomeModule { }
