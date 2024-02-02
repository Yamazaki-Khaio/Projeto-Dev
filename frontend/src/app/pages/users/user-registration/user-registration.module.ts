import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationRouting } from './user-registration.routing';

@NgModule({
  declarations: [
    UserRegistrationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    UserRegistrationRouting,
  ],
  exports: [],
  providers: []
})
export class UserRegistrationModule { }
