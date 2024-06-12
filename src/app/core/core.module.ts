import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyOTPComponent } from './forgotPassword/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './forgotPassword/reset-password/reset-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    VerifyOTPComponent,
    ResetPasswordComponent,
    PagenotfoundComponent,
    UserLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CoreModule { }
