import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { UsersRoutingModule } from './users-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    UserProfileComponent,
    UsersHomeComponent,
    UserEditComponent,


  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule


  ],
  exports: [
    UserRegistrationComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  providers: [
    // UsersService
    //apiService
  ]


})
export class UsersModule { }
